# 代码规范

本仓 NestJS / TypeScript 约定。出处见各节；本仓补充单独标明。

## 参考来源

- [NestJS 官方文档](https://docs.nestjs.com)：模块、依赖注入、DTO 与校验
- [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)：命名与类型边界（取与 Nest 兼容的子集）

## Nest 模块与分层

- 按功能域组织：`src/<feature>/` 下放置 `*.module.ts`、`*.controller.ts`、`*.service.ts`、`dto/`
- Controller 只做入参校验与调用 Service，不写业务编排细节
- 跨模块依赖通过 Nest DI 注入，避免循环依赖与直接 `new` 业务类
- 请求体 / 查询参数使用 DTO，配合 `class-validator` 与 `class-transformer`（见 Nest ValidationPipe 用法）

## TypeScript 子集

- 命名：类型与类用 `PascalCase`，变量与函数用 `camelCase`，常量用 `UPPER_SNAKE` 或模块级 `camelCase` 只读
- 公共 API 与非平凡函数标注明确类型；避免无必要的 `any`
- 优先显式分支，不依赖隐式类型兜底掩盖错误

## 配置与密钥

- 运行配置走 Nest `ConfigModule` / 环境变量，不硬编码密钥与连接串
- 密钥与 Token 放在 `.env`（勿提交仓库）；日志中脱敏

## 异常与错误处理

- 不使用裸 `catch` 吞掉异常后继续假装成功
- 业务可预期失败抛出 Nest HTTP 异常或明确的领域错误；基础设施故障保留足够上下文再向上抛

## 注释

- 关键路径、公共 API、非平凡逻辑用**中文**注释或 docstring，说明意图与契约（做什么、失败时怎样、边界）
- 写当前行为，不写变更史（「以前是 X」留给 git / OpenSpec change）
- 注释不复述语法；假设读者懂 TypeScript / Nest

## 本仓补充

- 代码可复用；达成目标即可，不做未请求的抽象
- 尽可能少改动：只动必须改的文件与行
- 保证项目能够完整启动
- **不写 `*.spec.ts` 单测文件**；验收优先 curl、手工冒烟或 e2e（若后续引入再单独开 change）
