/**
 * 更新文档请求：字段均可选；提供的字段才会被覆盖。
 */
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateDocumentDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @IsOptional()
  @IsString()
  body?: string;
}
