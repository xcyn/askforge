# 全源码学习注释设计（2026-10-28）

对应 OpenSpec：`openspec/changes/annotate-learning-source/`。

## 目标

在不改变行为的前提下，为 AskForge v1 手写源码补充中文学习注释，便于阅读 Nest 装配、stub 鉴权、文档 CRUD、切块/Embedding/检索/问答，以及前端登录壳与 RAG UI。

## 范围

- 含：`backend/src/**/*.ts`、`frontend/src/**/*.{ts,tsx,css}`
- 不含：构建产物、依赖、锁文件、`.env` 密钥正文

## 注释约定

与 [docs/agents/rules.md](../../agents/rules.md) 一致：写意图与契约，不复述显然语法，不写变更史。
