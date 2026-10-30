# Design: bootstrap-minimal-rag

## 取舍

| 决策 | 选择 | 理由 |
|------|------|------|
| 正文存储 | PostgreSQL `documents.body` | 单一数据源，便于学习 |
| 向量存储 | 同库 pgvector `chunks.embedding` | 与文档共用数据库，减少依赖 |
| 对象存储 | Compose 预置 MinIO，代码不接 | 为后续上传版留坑，本版零耦合 |
| 鉴权 | stub login + Bearer 校验 | 保留前端登录页，不做 refresh/RBAC |
| 切块 | 固定字符窗 500 / overlap 50，同步 | 无 MQ，便于一步看清 RAG |
| 问答 | 非流式 JSON | 前端薄实现，后续再对流式 |

## 模块边界

- `auth`：演示账号登录、`/auth/me`、简单 JWT 守卫
- `document`：CRUD；写路径调用索引重建
- `ai`：切块、Embedding/Chat 客户端、检索、问答编排
- `common`：共享工具（如 id 生成）

## 数据流

1. 写文档 → 删旧 chunks → 切块 → embedding → 插入 chunks
2. 问答 → 问题 embedding → 向量 TopK → 拼 prompt → chat completion → `{ answer, sources }`
