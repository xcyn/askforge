# Proposal: bootstrap-minimal-rag

## 为什么做

AskForge 目前仅有文档脚手架，尚无应用代码。需要落地可学习的第一版：文档入库、向量检索、基于上下文问答，并配上可复用的前端壳与 Docker 依赖。

## 做什么

- 根目录 Docker Compose：PostgreSQL 15 + pgvector、MinIO（本版应用不连接）
- Nest 后端：stub 登录、文档 CRUD、写入时同步切块/Embedding、非流式 `POST /ai/chat`
- Vite + Ant Design 前端：登录、文档、精简问答；AskForge 品牌壳与纸色主题

## 不做什么

文件上传/解析、流式 chat、会话持久化、团队权限、知识图谱和 Agent 工具链。

## 成功标准

见同目录 `tasks.md`；可执行步骤见 `docs/superpowers/plans/2026-10-28-minimal-rag.md`。
