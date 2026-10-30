## ADDED Requirements

### Requirement: Local compose provides Postgres with pgvector and MinIO

系统 MUST 在仓库根目录提供 `docker-compose.yml`，至少启动 PostgreSQL（含 pgvector）与 MinIO。

#### Scenario: Postgres ready for app

- **WHEN** 执行 `docker compose up -d` 且拉取镜像成功
- **THEN** Postgres 可接受连接，且已启用 `vector` 扩展并存在 `documents` / `chunks` 表结构

#### Scenario: MinIO is present but unused by v1 app

- **WHEN** Compose 启动完成
- **THEN** MinIO 服务处于可访问状态；本版 Nest 应用不要求配置 MinIO 连接即可启动
