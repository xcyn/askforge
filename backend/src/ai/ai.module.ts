/**
 * AI 域模块：切块、Embedding/Chat 客户端、索引、检索、问答编排。
 * 导出 IndexingService，供 DocumentService 在写文档后同步重建向量。
 */
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AiChatService } from './ai-chat.service';
import { AiController } from './ai.controller';
import { IndexingService } from './indexing.service';
import { OpenaiCompatibleClient } from './openai-compatible.client';
import { RetrievalService } from './retrieval.service';
import { TextChunker } from './text-chunker';

@Module({
  imports: [AuthModule], // 提供 JwtAuthGuard 等鉴权能力
  controllers: [AiController],
  providers: [
    OpenaiCompatibleClient,
    TextChunker,
    IndexingService,
    RetrievalService,
    AiChatService,
  ],
  exports: [IndexingService],
})
export class AiModule {}
