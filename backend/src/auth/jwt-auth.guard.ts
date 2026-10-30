/**
 * 路由守卫：委托 Passport 的 'jwt' 策略。
 * 用法：@UseGuards(JwtAuthGuard) 挂在 Controller 或方法上。
 */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
