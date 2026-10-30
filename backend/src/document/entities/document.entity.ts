/**
 * documents 表实体：知识库元数据与正文存于 PostgreSQL。
 * 列名 snake_case 通过 name 映射到 camelCase 属性。
 */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'documents' })
export class DocumentEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  title!: string;

  @Column({ type: 'text', default: '' })
  body!: string;

  /** active=可见；deleted=软删（列表不可见） */
  @Column({ type: 'text', default: 'active' })
  status!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
