## ADDED Requirements

### Requirement: Frontend style prefix is AskForge-native

前端样式类名、CSS 变量与动画名称 MUST 使用 `af-` 前缀。

#### Scenario: Class names match AskForge prefix

- **WHEN** 检查 `frontend/src` 下的 CSS 与 TSX
- **THEN** 应用壳与业务页使用的样式标识均为 `af-*`

### Requirement: Docs describe AskForge capabilities in project-native wording

需求与设计文档 MUST 以 AskForge 自身能力表述前端与依赖；合法第三方许可署名除外，MUST NOT 引入外部项目品牌对照。

#### Scenario: Docs read as AskForge-native

- **WHEN** 阅读仓库需求 / 设计文档与前端源码注释
- **THEN** 表述均为 AskForge 当前能力与命名（合法第三方许可署名除外）
