# OpenSpec

本目录存放**需求与规格**变更记录。代码设计与可执行步骤不写在这里，见 `docs/superpowers/` 与 [docs/agents/dev-flow.md](../docs/agents/dev-flow.md)。

## 布局

```
openspec/changes/<change-name>/
  proposal.md    # 为什么做、做什么
  design.md      # 方案要点与取舍
  specs/         # 能力规格（可多文件）
  tasks.md       # 范围与验收索引（禁止复制 plan 中的步骤）
```

## 规则

- 每个变更一个目录；目录名用小写短横线（如 `document-upload`）。
- 进入写代码前，须有已与需求方对齐的 change。
- `tasks.md` 只列交付项与完成标准，并指向对应的 superpowers plan；**不得**与 plan 重复同一套可执行步骤。
