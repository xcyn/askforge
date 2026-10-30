## ADDED Requirements

### Requirement: Compose provides pgAdmin for Postgres

系统 MUST 在根目录 `docker-compose.yml` 中提供 pgAdmin 服务，便于图形化管理 PostgreSQL。

#### Scenario: pgAdmin starts with compose

- **WHEN** 执行 `docker compose up -d` 且拉取镜像成功
- **THEN** 容器 `askforge-pgadmin` 处于运行状态，宿主可通过 `http://127.0.0.1:8089` 打开登录页

#### Scenario: Login with configured credentials

- **WHEN** 使用本地环境变量中的 `PGADMIN_DEFAULT_EMAIL` / `PGADMIN_DEFAULT_PASSWORD` 登录
- **THEN** 登录成功并进入 pgAdmin 控制台

#### Scenario: Can reach Postgres inside the compose network

- **WHEN** 在 pgAdmin 中添加 Server：Host=`askforge-postgres`、Port=`5432`，库名、用户和密码来自本地 `DATABASE_*`
- **THEN** 可连接并看到 `documents` 与 `chunks` 表

### Requirement: MinIO Console remains available without a separate client image

系统 MUST 继续通过现有 MinIO 服务暴露管理控制台，且 MUST NOT 为此再增加独立客户端容器。

#### Scenario: MinIO Console port reachable

- **WHEN** Compose 启动完成
- **THEN** 宿主可通过 `http://127.0.0.1:9011` 访问 MinIO Console（登录信息见本地 `.env` 中的 `MINIO_ROOT_*`）
