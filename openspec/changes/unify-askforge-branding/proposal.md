# Proposal: unify-askforge-branding

## 为什么做

前端样式标识与部分文档表述尚未完全统一到 AskForge 自身命名与能力描述，阅读成本偏高。需要收束为一致的项目内命名。

## 做什么

- 前端 CSS / JSX：样式类名、变量、动画统一使用 `af-` 前缀
- 相关 OpenSpec / superpowers 文档：按 AskForge 当前能力书写，不写外部对照式叙述
- 不改业务逻辑、样式数值、合法第三方署名

## 不做什么

- 不重做 UI 视觉
- 不改 API / 数据库 schema
- 不删除历史验收日志中的事实记录（仅统一表述）

## 成功标准

见同目录 `tasks.md`；可执行步骤见 `docs/superpowers/plans/2026-10-29-unify-branding.md`。
