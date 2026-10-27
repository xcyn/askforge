# 开发流程（OpenSpec × superpowers）

从提出需求到落地的协作约定。skill / 工具自身细节不在此复述。

## 分工

| 环节 | 归属 | 产物路径 |
|------|------|----------|
| 需求澄清 | 对话（先问） | — |
| 需求 / 规格 | OpenSpec | `openspec/changes/<name>/proposal.md`、`design.md`、`specs/` |
| 范围 / 验收索引 | OpenSpec | `openspec/changes/<name>/tasks.md` |
| 代码设计 | superpowers | `docs/superpowers/specs/YYYY-MM-DD-<name>-design.md` |
| 任务分片与执行步骤 | superpowers | `docs/superpowers/plans/YYYY-MM-DD-<name>.md` |
| 执行过程记录 | superpowers | 与 plan 同目录的 `execution-log.md`（有执行再写） |

OpenSpec 目录总览见 [openspec/README.md](../../openspec/README.md)。

## 步骤单一真源

同一套**可执行步骤**只能出现在 superpowers **plan** 中。

- `tasks.md`：交付项、完成标准、指向 plan；**禁止**复制 plan 步骤
- plan：改哪些文件、怎么验证、怎么收尾
- OpenSpec `proposal` / `design` / `specs`：为什么做与规格是什么

## 闸门

1. **先提问**：需求不清时先列假设与问题，对齐后再动手；不猜测实现
2. **写代码前**：须有已对齐的 `openspec/changes/<name>/`（至少 proposal + 必要 specs）
3. **声称完成前**：按对应 plan 的验收项自检；启动级要求见根目录 `AGENTS.md`

## 推荐顺序

澄清需求 → 写 / 更新 OpenSpec change → 写 superpowers design（需要时）→ 写 plan → 按 plan 实现 → 填写 execution-log（如有）→ 按 tasks 验收索引勾选
