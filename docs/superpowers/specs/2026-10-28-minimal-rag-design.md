# AskForge 最小 RAG 设计（2026-10-28）

对应 OpenSpec：`openspec/changes/bootstrap-minimal-rag/`。

## 组件

| 组件 | 职责 |
|------|------|
| `backend` Nest 应用 | HTTP API、切块、调用 Embedding/Chat、写 PG |
| `frontend` Vite React | 登录壳、文档 CRUD UI、非流式问答页 |
| Postgres + pgvector | `documents` / `chunks` |
| MinIO | 仅 Compose 预置 |
| OpenAI 兼容 API | Embedding + Chat |

## 表结构

- `documents(id uuid PK, title text, body text, status text, created_at, updated_at)`
- `chunks(id uuid PK, document_id FK, ordinal int, content text, embedding vector(N))`

`N` 由环境变量 `EMBEDDING_DIMS` 决定；init SQL 使用可配置维度需与代码一致（默认 1024，DashScope `text-embedding-v3`）。

## API

- `POST /auth/login` `{ username, password }` → `{ accessToken, user }`
- `GET /auth/me`
- `POST/GET/PATCH/DELETE /documents`…
- `POST /ai/chat` `{ content, topK? }` → `{ answer, sources: [{ documentId, title, chunkOrdinal, snippet }] }`

## 前端壳

Ant Design 主题 + AskForge 布局；路由仅 `/login`、`/documents*`、`/chat`；localStorage 前缀 `af_`；样式类名前缀 `af-`。
