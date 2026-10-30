# Proposal: annotate-learning-source

## 为什么做

AskForge v1 源码已可运行，但注释偏少，不利于逐步阅读学习 Nest / RAG / 前端壳层实现。

## 做什么

为 `backend/src/**` 与 `frontend/src/**` 手写源码补充中文学习注释：文件职责、契约、关键数据流与就近解释。**不改变任何运行行为**。

## 不做什么

不改命名、逻辑、接口、样式视觉效果；不注释 `dist/`、`node_modules/`、lock；不新增单测。

## 成功标准

见同目录 `tasks.md`；步骤见 `docs/superpowers/plans/2026-10-28-learning-comments.md`。
