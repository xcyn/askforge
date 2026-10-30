# Tasks: bootstrap-minimal-rag

## 交付范围

- [x] OpenSpec + superpowers design/plan 齐备
- [x] Docker Compose（pgvector Postgres + MinIO）与 `.env.example`
- [x] Nest：stub auth、document CRUD、同步切块/向量、`POST /ai/chat`
- [x] 前端：AskForge 品牌、登录、文档、精简问答
- [x] README 启动说明；compose + Nest boot 自检通过

## 完成标准

见 change 内 `specs/` 场景；冒烟步骤见 [docs/superpowers/plans/2026-10-28-minimal-rag.md](../../../docs/superpowers/plans/2026-10-28-minimal-rag.md)。

## 非目标

上传解析、流式 chat、会话、团队权限和知识图谱。
