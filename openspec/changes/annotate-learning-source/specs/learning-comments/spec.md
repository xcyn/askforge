## ADDED Requirements

### Requirement: Handwritten sources carry Chinese learning comments

系统手写源码 MUST 包含中文文件级说明，并对关键路径（鉴权、CRUD、切块/向量、检索问答、前端鉴权与 API、页面状态流）提供就近注释。

#### Scenario: Comments do not change runtime behavior

- **WHEN** 仅增补注释后重新构建并启动 Nest / Vite
- **THEN** 登录、文档 CRUD、问答接口行为与注释前一致

#### Scenario: Generated artifacts stay untouched

- **WHEN** 完成注释变更
- **THEN** 未手工改写 `backend/dist/`、`frontend/node_modules/` 中的第三方或构建产物作为注释目标
