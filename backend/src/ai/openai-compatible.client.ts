/**
 * OpenAI 兼容 HTTP 客户端（默认 DashScope compatible-mode）。
 * 提供 embed（/embeddings）与 chat（/chat/completions）。
 * 失败：未配置 Key → 503；网络/上游错误 → 503（日志含状态摘要，脱敏不打 Key）。
 */
import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/** Embedding 接口响应中的 data 项 */
type EmbeddingResponse = {
  data: Array<{ embedding: number[]; index: number }>;
};

/** Chat Completions 最小响应形状 */
type ChatResponse = {
  choices: Array<{ message?: { content?: string } }>;
};

@Injectable()
export class OpenaiCompatibleClient {
  private readonly logger = new Logger(OpenaiCompatibleClient.name);

  constructor(private readonly config: ConfigService) {}

  /**
   * 批量文本 → 向量；空输入直接 []。
   * DashScope text-embedding-v3 单次 input 条数上限为 10，超限会 400，故按批切分后拼接。
   */
  async embed(texts: string[]): Promise<number[][]> {
    if (texts.length === 0) {
      return [];
    }
    const batchSize = Number(
      this.config.get<string>('EMBEDDING_BATCH_SIZE', '10'),
    );
    const all: number[][] = [];
    for (let offset = 0; offset < texts.length; offset += batchSize) {
      const batch = texts.slice(offset, offset + batchSize);
      const body = {
        model: this.config.get<string>('EMBEDDING_MODEL', 'text-embedding-v3'),
        input: batch,
        // 显式维度，与 init.sql 中 vector(N) / EMBEDDING_DIMS 对齐
        dimensions: Number(this.config.get<string>('EMBEDDING_DIMS', '1024')),
      };
      const json = await this.postJson<EmbeddingResponse>('/embeddings', body);
      // 按 index 排序，保证与本批 texts 下标一一对应
      const sorted = [...json.data].sort((a, b) => a.index - b.index);
      all.push(...sorted.map((item) => item.embedding));
    }
    return all;
  }

  /** 单轮 system+user 对话，返回助手文本 */
  async chat(system: string, user: string): Promise<string> {
    const body = {
      model: this.config.get<string>('CHAT_MODEL', 'qwen-plus'),
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      temperature: 0.2, // 偏低，利于知识库问答稳定复述
    };
    const json = await this.postJson<ChatResponse>('/chat/completions', body);
    const content = json.choices[0]?.message?.content?.trim();
    if (!content) {
      throw new ServiceUnavailableException('Chat API 未返回内容');
    }
    return content;
  }

  /** 统一 POST JSON；path 形如 /embeddings */
  private async postJson<T>(path: string, body: unknown): Promise<T> {
    const base = this.config
      .get<string>(
        'OPENAI_BASE_URL',
        'https://dashscope.aliyuncs.com/compatible-mode/v1',
      )
      .replace(/\/$/, '');
    const key = this.config.get<string>('OPENAI_API_KEY', '');
    if (!key || key.startsWith('<')) {
      throw new ServiceUnavailableException('未配置 OPENAI_API_KEY');
    }
    let response: Response;
    try {
      response = await fetch(`${base}${path}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    } catch (err) {
      this.logger.error(`调用 ${path} 网络失败`, err);
      throw new ServiceUnavailableException('AI 服务不可达');
    }
    if (!response.ok) {
      const text = await response.text();
      // 只截取前 200 字，避免大段上游错误刷屏
      this.logger.error(`调用 ${path} 失败: ${response.status} ${text.slice(0, 200)}`);
      throw new ServiceUnavailableException(`AI 服务错误: ${response.status}`);
    }
    return (await response.json()) as T;
  }
}
