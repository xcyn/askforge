# Design — Compose 管理端 GUI（2026-10-28）

对应 OpenSpec：`openspec/changes/add-compose-guis/`。

## 目标

本地用网页查看 Postgres 表数据；MinIO 继续用内置 Console。

## 组件

| 组件 | 访问 | 说明 |
|------|------|------|
| pgAdmin | `http://127.0.0.1:8089` | 新容器 `askforge-pgadmin` |
| MinIO Console | `http://127.0.0.1:9011` | 现有 minio 服务，不新增镜像 |

## pgAdmin → Postgres

同 Compose 网络：Host `askforge-postgres`，Port `5432`（勿用宿主映射 `5433`）。

凭据：`askforge` / `askforge` / 库 `askforge`。

## 非目标

应用代码、自动注册 Server，以及本项目未使用的其他中间件客户端。
