/**
 * 固定字符窗口切块器。
 * 配置：CHUNK_SIZE（默认 500）、CHUNK_OVERLAP（默认 50）。
 * 空正文返回 []；短于窗口则整段一块。
 */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TextChunker {
  constructor(private readonly config: ConfigService) {}

  /** 将正文切成有序片段，供后续批量 Embedding */
  split(text: string): string[] {
    const size = Number(this.config.get<string>('CHUNK_SIZE', '500'));
    const overlap = Number(this.config.get<string>('CHUNK_OVERLAP', '50'));
    // 统一换行并去首尾空白，避免 Windows \r\n 干扰长度计算
    const normalized = text.replace(/\r\n/g, '\n').trim();
    if (!normalized) {
      return [];
    }
    if (normalized.length <= size) {
      return [normalized];
    }
    const chunks: string[] = [];
    let start = 0;
    while (start < normalized.length) {
      const end = Math.min(start + size, normalized.length);
      chunks.push(normalized.slice(start, end));
      if (end >= normalized.length) {
        break;
      }
      // 下一块起点回退 overlap，保留相邻块语义连续性
      start = Math.max(0, end - overlap);
    }
    return chunks;
  }
}
