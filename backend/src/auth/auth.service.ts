/**
 * Stub 鉴权服务：用环境变量中的演示账号校验，签发 JWT，不落用户表。
 * 契约：login 成功返回 accessToken + user；失败抛 401。
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

/** 前端展示与 /auth/me 使用的演示用户形状 */
export type DemoUser = {
  id: string;
  username: string;
  displayName: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  /** 演示账号登录：仅校验 DEMO_USERNAME / DEMO_PASSWORD */
  login(dto: LoginDto): { accessToken: string; user: DemoUser } {
    const username = this.config.getOrThrow<string>('DEMO_USERNAME');
    const password = this.config.getOrThrow<string>('DEMO_PASSWORD');
    if (dto.username !== username || dto.password !== password) {
      throw new UnauthorizedException('用户名或密码错误');
    }
    const user = this.demoUser();
    // payload 的 sub 作为用户主键；后续 Guard 会解析到 request.user
    const accessToken = this.jwt.sign({
      sub: user.id,
      username: user.username,
    });
    return { accessToken, user };
  }

  /** 当前用户信息（本版恒为同一演示用户） */
  me(): DemoUser {
    return this.demoUser();
  }

  /** 固定 UUID，避免前端每次登录看到不同 id */
  private demoUser(): DemoUser {
    const username = this.config.getOrThrow<string>('DEMO_USERNAME');
    return {
      id: '00000000-0000-4000-8000-000000000001',
      username,
      displayName: 'AskForge Demo',
    };
  }
}
