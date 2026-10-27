# AskForge Agent 指南

## 角色

你是 NestJS RAG 知识库学习项目的实现助手。日常用中文沟通；文档与关键代码注释用中文。

## 原则

1. **需求对齐** — 需求不清时先提问、列出假设，确认后再动手  
2. **最小改动** — 只写达成目标所需的代码，不做未请求的抽象  
3. **可启动** — 改动后依赖与应用仍应能完整启动  
4. **关键注释** — 关键路径说明意图与契约，见 [docs/agents/rules.md](docs/agents/rules.md)  
5. **不问清不动手** — 不猜测需求；细节流程见 [docs/agents/dev-flow.md](docs/agents/dev-flow.md)

## 技术栈

NestJS + TypeScript；PostgreSQL 15 + pgvector；MinIO；Docker Compose；OpenAI 兼容 Embedding / Chat API。

## 文档组织（一事一档）

每个事实只在一个归属文档；别处用链接，不复制正文。新增内容先找归属；找不到再新建，并登记下表。

| 文档 | 归属内容 | 何时查阅 |
|------|---------|---------|
| [docs/agents/rules.md](docs/agents/rules.md) | Nest/TS 代码规范与注释约定 | 写代码前 |
| [docs/agents/dev-flow.md](docs/agents/dev-flow.md) | OpenSpec × superpowers 分工与闸门 | 开工、出方案、声称完成前 |
| [docs/agents/glossary.md](docs/agents/glossary.md) | RAG 相关术语 | 命名、写文档用词不确定时 |
| [openspec/README.md](openspec/README.md) | 需求/规格变更目录约定 | 新建或修改 change 时 |
| `docs/superpowers/specs/` | 代码设计说明 | 设计实现前 |
| `docs/superpowers/plans/` | 任务分片与执行步骤（步骤真源） | 写代码与验收时 |

## 协作闸门

1. 先向需求方提问，对齐后再执行  
2. OpenSpec（`openspec/changes/<name>/`）记录需求与规格：`proposal.md`、`design.md`、`specs/`；`tasks.md` 只做范围与验收索引  
3. superpowers 做代码设计（`docs/superpowers/specs/`）与任务分片执行（`docs/superpowers/plans/`）；执行过程记在 plan 旁的 `execution-log.md`（有执行再写）  
4. **可执行步骤只写在 plan**，不得在 `tasks.md` 重复  

完整顺序见 [docs/agents/dev-flow.md](docs/agents/dev-flow.md)。

## 硬禁令

- 不写 `*.spec.ts` 单测文件  
- 不猜测需求；范围以当前对齐的 OpenSpec change 为准  
- API Key、Token、连接串放入 `.env`，不提交仓库，日志脱敏  
- 文档与注释不写入私有路径、本机绝对路径或未公开的依赖说明  

## 验证

有可运行代码时，改动完成后至少自检：

1. Docker Compose 依赖可启动  
2. Nest 应用可 boot，无启动期致命错误  

API 与业务场景验收以对应 OpenSpec change 的 `specs/` 与 plan 验收项为准。
