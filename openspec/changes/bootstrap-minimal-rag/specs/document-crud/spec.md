## ADDED Requirements

### Requirement: Document CRUD with synchronized vector chunks

系统 MUST 提供无上传的文档 CRUD；创建与更新正文时同步重建该文档的切块与向量；软删时移除对应向量切块。

#### Scenario: Create document indexes chunks

- **WHEN** 已登录客户端调用 `POST /documents` 且 body 含合法 `title` 与 `body`，且 Embedding API 可用
- **THEN** 写入 `documents` 行，并为正文生成一条或多条带非空 `embedding` 的 `chunks` 行

#### Scenario: Soft delete removes chunks

- **WHEN** 调用 `DELETE /documents/:id` 针对已存在文档
- **THEN** 文档标记为已删除（或等价软删状态），且该文档的 `chunks` 被删除

#### Scenario: List and get

- **WHEN** 调用 `GET /documents` 或 `GET /documents/:id`
- **THEN** 仅返回未软删文档；详情含 `title` 与 `body`
