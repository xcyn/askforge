/**
 * chunks 表实体（元数据侧）。
 * embedding 列由 raw SQL 读写，不在此映射，避免 TypeORM 与 vector 类型冲突。
 */
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'chunks' })
export class ChunkEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ name: 'document_id', type: 'uuid' })
  documentId!: string;

  /** 同一文档内切块序号，从 0 起 */
  @Column({ type: 'int' })
  ordinal!: number;

  @Column({ type: 'text' })
  content!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}
