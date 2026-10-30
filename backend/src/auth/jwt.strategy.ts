/**
 * Passport JWT 策略：从 Authorization: Bearer 取 token，用 JWT_SECRET 校验。
 * validate 返回值会挂到 request.user，供业务侧读取（本版未深度使用）。
 */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/** 与 AuthService.sign 写入的 payload 字段对齐 */
export type JwtPayload = {
  sub: string;
  username: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // 过期 token 一律拒绝
      secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
    });
  }

  /** 校验通过后的用户投影 */
  validate(payload: JwtPayload) {
    return { userId: payload.sub, username: payload.username };
  }
}
