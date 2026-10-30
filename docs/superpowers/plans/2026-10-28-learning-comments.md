# Plan: 全源码学习注释（2026-10-28）

## 步骤

1. 写入 OpenSpec change 与本 design/plan
2. 注释 `backend/src`（main → app → auth → ai → document）
3. 注释 `frontend/src` TS/TSX（入口 → auth/api → layout → pages）
4. 注释 `frontend/src/index.css` 分区
5. `nest build`、`frontend build`；Nest boot；curl 登录/文档/问答冒烟；更新 execution-log

## 验收

- 手写源码均有文件级说明；关键路径有就近注释
- 构建通过；boot 无致命错误；API 冒烟行为正常
- 无 `*.spec.ts`；未改 dist/node_modules 作为注释目标
