/**
 * 文档业务：CRUD + 写路径触发向量重建。
 * 列表/详情只返回 status=active；删除置 deleted 并清 chunks。
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { IndexingService } from '../ai/indexing.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { DocumentEntity } from './entities/document.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(DocumentEntity)
    private readonly docs: Repository<DocumentEntity>,
    private readonly indexing: IndexingService,
  ) {}

  /** 落库后立即 reindex；Embedding 失败会向上抛，整次创建失败 */
  async create(dto: CreateDocumentDto): Promise<DocumentEntity> {
    const entity = this.docs.create({
      id: uuidv4(),
      title: dto.title,
      body: dto.body ?? '',
      status: 'active',
    });
    const saved = await this.docs.save(entity);
    await this.indexing.reindexDocument(saved.id, saved.body);
    return saved;
  }

  async findAll(): Promise<DocumentEntity[]> {
    return this.docs.find({
      where: { status: 'active' },
      order: { updatedAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<DocumentEntity> {
    const doc = await this.docs.findOne({ where: { id, status: 'active' } });
    if (!doc) {
      throw new NotFoundException('文档不存在');
    }
    return doc;
  }

  /** 部分更新；无论改标题或正文都重建索引，保证向量与正文一致 */
  async update(id: string, dto: UpdateDocumentDto): Promise<DocumentEntity> {
    const doc = await this.findOne(id);
    if (dto.title !== undefined) {
      doc.title = dto.title;
    }
    if (dto.body !== undefined) {
      doc.body = dto.body;
    }
    const saved = await this.docs.save(doc);
    await this.indexing.reindexDocument(saved.id, saved.body);
    return saved;
  }

  async remove(id: string): Promise<void> {
    const doc = await this.findOne(id);
    doc.status = 'deleted';
    await this.docs.save(doc);
    await this.indexing.deleteByDocument(id);
  }
}
