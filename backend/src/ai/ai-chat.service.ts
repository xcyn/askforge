/**
 * RAG 问答编排：检索 TopK → 拼上下文 → Chat 生成 → 返回 answer + sources。
 * 无命中时不调用 Chat，直接返回固定提示文案。
 */
import { Injectable } from '@nestjs/common';
import { ChatDto } from './dto/chat.dto';
import { OpenaiCompatibleClient } from './openai-compatible.client';
import { RetrievalService } from './retrieval.service';

/** 前端引用列表项：文档 id、标题、块序号、正文摘要 */
export type ChatSource = {
  documentId: string;
  title: string;
  chunkOrdinal: number;
  snippet: string;
};

@Injectable()
export class AiChatService {
  constructor(
    private readonly retrieval: RetrievalService,
    private readonly openai: OpenaiCompatibleClient,
  ) {}

  async chat(dto: ChatDto): Promise<{ answer: string; sources: ChatSource[] }> {
    const topK = dto.topK ?? 5;
    const hits = await this.retrieval.search(dto.content, topK);
    // sources 截断 snippet，避免响应过大
    const sources: ChatSource[] = hits.map((hit) => ({
      documentId: hit.documentId,
      title: hit.title,
      chunkOrdinal: hit.ordinal,
      snippet: hit.content.slice(0, 240),
    }));

    if (hits.length === 0) {
      return {
        answer: '知识库中暂无相关内容，请先创建文档后再提问。',
        sources: [],
      };
    }

    // 编号上下文，便于模型引用「第几段」
    const context = hits
      .map(
        (hit, index) =>
          `[#${index + 1}] 文档「${hit.title}」片段${hit.ordinal + 1}:\n${hit.content}`,
      )
      .join('\n\n');

    const system =
      '你是 AskForge 知识库助手。仅依据提供的检索上下文回答用户问题；' +
      '若上下文不足以回答，请明确说明不知道。回答使用简洁中文。';
    const user = `检索上下文：\n${context}\n\n用户问题：${dto.content}`;
    const answer = await this.openai.chat(system, user);
    return { answer, sources };
  }
}
