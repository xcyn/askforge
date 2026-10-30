/**
 * 向量检索：问题 Embedding 后，用 pgvector 距离运算符 <=> 取 TopK。
 * 仅 join status=active 的文档；距离越小越相似（余弦距离语义取决于索引配置）。
 */
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { OpenaiCompatibleClient } from './openai-compatible.client';

/** 检索命中的一块上下文，供问答拼 prompt 与 sources */
export type RetrievedChunk = {
  chunkId: string;
  documentId: string;
  title: string;
  ordinal: number;
  content: string;
  distance: number;
};

@Injectable()
export class RetrievalService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly openai: OpenaiCompatibleClient,
  ) {}

  async search(query: string, topK: number): Promise<RetrievedChunk[]> {
    const [vector] = await this.openai.embed([query]);
    const literal = `[${vector!.join(',')}]`;
    // <=> ：向量距离；ORDER BY 距离升序即最近邻
    const rows = (await this.dataSource.query(
      `SELECT c.id AS "chunkId",
              c.document_id AS "documentId",
              d.title AS title,
              c.ordinal AS ordinal,
              c.content AS content,
              (c.embedding <=> $1::vector) AS distance
       FROM chunks c
       INNER JOIN documents d ON d.id = c.document_id
       WHERE d.status = 'active'
       ORDER BY c.embedding <=> $1::vector
       LIMIT $2`,
      [literal, topK],
    )) as Array<{
      chunkId: string;
      documentId: string;
      title: string;
      ordinal: number;
      content: string;
      distance: string | number;
    }>;

    // pg 可能把数值以 string 返回，这里统一 Number
    return rows.map((row) => ({
      chunkId: row.chunkId,
      documentId: row.documentId,
      title: row.title,
      ordinal: Number(row.ordinal),
      content: row.content,
      distance: Number(row.distance),
    }));
  }
}
