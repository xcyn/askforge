/**
 * Nest 应用入口。
 * 职责：创建 AppModule、挂全局校验与 CORS，然后监听 PORT。
 * 依赖：AppModule；环境变量 PORT（默认 3000）。
 */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // 根据根模块装配整棵依赖注入树
  const app = await NestFactory.create(AppModule);
  // 允许前端本地开发跨域携带 Cookie/凭证（本版主要用 Bearer）
  app.enableCors({ origin: true, credentials: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 剥掉 DTO 未声明字段，防止多余参数进入业务
      transform: true, // 自动把 JSON 转成 DTO 类实例（配合 @Type）
      forbidNonWhitelisted: true, // 出现未声明字段直接 400
    }),
  );
  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
}

// 顶层启动；void 表示有意不 await（Node 进程由 listen 保持）
void bootstrap();
