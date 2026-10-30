/**
 * 鉴权 HTTP 面：POST /auth/login（公开）、GET /auth/me（需 Bearer）。
 */
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** 公开登录；body 经 ValidationPipe + LoginDto 校验 */
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  /** 需有效 JWT；用于前端启动时刷新本地用户展示 */
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me() {
    return this.authService.me();
  }
}
