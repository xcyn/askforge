/**
 * 应用根模块：装配配置、数据库与三大业务域（auth / document / ai）。
 * TypeORM synchronize=false：表结构以 init.sql 为准，避免运行时改 schema。
 */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiModule } from './ai/ai.module';
import { AuthModule } from './auth/auth.module';
import { DocumentModule } from './document/document.module';
import { ChunkEntity } from './document/entities/chunk.entity';
import { DocumentEntity } from './document/entities/document.entity';

@Module({
  imports: [
    // 全局可读 ConfigService；优先 backend/.env，其次仓库根 .env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../.env'],
    }),
    // 异步注入配置再建连接，避免硬编码数据库参数
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST', '127.0.0.1'),
        port: Number(config.get<string>('DATABASE_PORT', '5432')),
        username: config.getOrThrow<string>('DATABASE_USER'),
        password: config.getOrThrow<string>('DATABASE_PASSWORD'),
        database: config.getOrThrow<string>('DATABASE_NAME'),
        entities: [DocumentEntity, ChunkEntity],
        synchronize: false, // 向量列等由 SQL 初始化，禁止 ORM 自动迁表
      }),
    }),
    AuthModule,
    DocumentModule,
    AiModule,
  ],
})
export class AppModule {}
