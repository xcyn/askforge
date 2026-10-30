# Design — 统一 AskForge 命名与文档表述（2026-10-29）

对应 OpenSpec：`openspec/changes/unify-askforge-branding/`。

## 目标

可维护源码与文档只呈现 AskForge 自身命名与能力描述；页面视觉与行为不变。

## 改动面

1. `frontend/src/index.css` 与 layouts/pages：样式标识统一为 `af-`
2. minimal-rag / add-compose-guis 相关文档的能力描述句
3. 本 change 的 OpenSpec / plan / execution-log

## 非目标

样式重设计、API 变更、删除历史验收事实、抹除合法许可署名。
