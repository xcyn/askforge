# Design: add-compose-guis

## 决策

| 项 | 选择 | 原因 |
|----|------|------|
| Postgres GUI | `dpage/pgadmin4:latest` | 常用、便于本地查看表数据 |
| 宿主端口 | `8089:80` | 避开本机常见的 `8088` |
| MinIO GUI | 不新增容器 | 服务已带 `--console-address :9001` → 宿主 `9011` |
| 连库地址 | Host=`askforge-postgres` Port=`5432` | 同 Compose 网络内端口，不是宿主 `5433` |

## 环境变量

- `PGADMIN_DEFAULT_EMAIL`：从本地 `.env` 读取有效的登录邮箱
- `PGADMIN_DEFAULT_PASSWORD`：从本地 `.env` 读取登录密码

Compose 要求两项都在本地 `.env` 中配置；无默认账号。

## 数据卷

`askforge_pgadmin_data` → `/var/lib/pgadmin`，保留登录与已添加的 Server 配置。

## 依赖

`depends_on.postgres.condition: service_healthy`，避免库未就绪时误连。
