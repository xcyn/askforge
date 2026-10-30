## ADDED Requirements

### Requirement: Non-streaming RAG chat

系统 MUST 提供基于向量检索的非流式问答接口。

#### Scenario: Answer with sources

- **WHEN** 知识库中已有已索引文档，且客户端调用 `POST /ai/chat` 传入 `content`
- **THEN** 返回 JSON，含基于检索上下文生成的 `answer`，以及含文档引用信息的 `sources` 数组

### Requirement: Stub authentication for UI shell

系统 MUST 提供演示用登录，使前端可携带 Bearer Token 访问受保护接口。

#### Scenario: Demo login

- **WHEN** 使用配置的演示账号调用 `POST /auth/login`
- **THEN** 返回 `accessToken` 与用户信息；后续带该 Token 可调用文档与问答接口
