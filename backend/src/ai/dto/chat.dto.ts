/**
 * 问答请求体：必填问题 content；可选 topK（召回条数，1–20）。
 */
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min, MinLength } from 'class-validator';

export class ChatDto {
  @IsString()
  @MinLength(1)
  content!: string;

  @IsOptional()
  @Type(() => Number) // JSON 数字偶发字符串时强制转 number
  @IsInt()
  @Min(1)
  @Max(20)
  topK?: number;
}
