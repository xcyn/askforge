/**
 * 文档 HTTP 面（均需 JWT）：
 * POST/GET /documents、GET/PATCH/DELETE /documents/:id
 * id 经 ParseUUIDPipe，非法 UUID 直接 400。
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Controller('documents')
@UseGuards(JwtAuthGuard)
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  create(@Body() dto: CreateDocumentDto) {
    return this.documentService.create(dto);
  }

  @Get()
  findAll() {
    return this.documentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.documentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateDocumentDto,
  ) {
    return this.documentService.update(id, dto);
  }

  /** 软删；响应固定 { ok: true } */
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.documentService.remove(id);
    return { ok: true };
  }
}
