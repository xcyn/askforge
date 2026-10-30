/**
 * 创建文档请求：标题非空；正文可为任意字符串（空串则跳过索引）。
 */
import { IsString, MinLength } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @MinLength(1)
  title!: string;

  @IsString()
  body!: string;
}
