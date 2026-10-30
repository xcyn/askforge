/**
 * AI HTTP 面：POST /ai/chat（需 JWT）。
 * 非流式 JSON：{ answer, sources }。
 */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AiChatService } from './ai-chat.service';
import { ChatDto } from './dto/chat.dto';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private readonly chatService: AiChatService) {}

  @Post('chat')
  chat(@Body() dto: ChatDto) {
    return this.chatService.chat(dto);
  }
}
