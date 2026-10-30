/**
 * 文档域模块：CRUD Controller/Service + TypeORM 实体。
 * 依赖 AiModule.IndexingService 在写路径同步重建向量。
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiModule } from '../ai/ai.module';
import { AuthModule } from '../auth/auth.module';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { ChunkEntity } from './entities/chunk.entity';
import { DocumentEntity } from './entities/document.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentEntity, ChunkEntity]),
    AuthModule,
    AiModule,
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
  exports: [DocumentService],
})
export class DocumentModule {}
