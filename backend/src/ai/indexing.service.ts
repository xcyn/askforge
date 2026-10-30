/**
 * 文档向量索引：删旧 chunks → 切块 → Embedding → 写入 pgvector。
 * 由 DocumentService 在 create/update 时同步调用；软删时只 deleteByDocument。
 */
import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { OpenaiCompatibleClient } from './openai-compatible.client';
import { TextChunker } from './text-chunker';

@Injectable()
export class IndexingService {
  private readonly logger = new Logger(IndexingService.name);

  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly chunker: TextChunker,
    private readonly openai: OpenaiCompatibleClient,
  ) {}

  /** 重建指定文档的全部切块向量（先删后写，保证一致性） */
  async reindexDocument(documentId: string, body: string): Promise<void> {
    await this.dataSource.query(`DELETE FROM chunks WHERE document_id = $1`, [
      documentId,
    ]);

    const pieces = this.chunker.split(body);
    if (pieces.length === 0) {
      this.logger.warn(`文档 ${documentId} 正文为空，跳过索引`);
      return;
    }

    const vectors = await this.openai.embed(pieces);
    for (let i = 0; i < pieces.length; i++) {
      const id = uuidv4();
      // pgvector 字面量形如 [0.1,0.2,...]，经 $5::vector 入库
      const literal = this.toVectorLiteral(vectors[i]!);
      await this.dataSource.query(
        `INSERT INTO chunks (id, document_id, ordinal, content, embedding)
         VALUES ($1, $2, $3, $4, $5::vector)`,
        [id, documentId, i, pieces[i], literal],
      );
    }
  }

  /** 文档软删时移除其向量，避免检索命中已删内容 */
  async deleteByDocument(documentId: string): Promise<void> {
    await this.dataSource.query(`DELETE FROM chunks WHERE document_id = $1`, [
      documentId,
    ]);
  }

  private toVectorLiteral(embedding: number[]): string {
    return `[${embedding.join(',')}]`;
  }
}
