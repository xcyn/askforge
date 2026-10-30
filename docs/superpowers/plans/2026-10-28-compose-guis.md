# Plan — Compose 管理端 GUI（2026-10-28）

对应 OpenSpec：`openspec/changes/add-compose-guis/`。

## 1. OpenSpec

写入 `openspec/changes/add-compose-guis/`：`proposal.md`、`design.md`、`specs/compose-admin-ui/spec.md`、`tasks.md`。

## 2. 设计与本 plan

写入 `docs/superpowers/specs/2026-10-28-compose-guis-design.md` 与本文件。

## 3. 环境与说明文档

- `.env.example`、本地 `.env`：增加 `PGADMIN_DEFAULT_EMAIL`、`PGADMIN_DEFAULT_PASSWORD`
- `README.md`：启动段补充 pgAdmin / MinIO Console 与 Server 连接参数
- `docs/specs/v1.md`：Compose 摘要补上 pgAdmin

## 4. Compose

根目录 `docker-compose.yml`：

- 增加 `pgadmin` 服务（镜像 `dpage/pgadmin4:latest`，端口 `8089:80`，volume `askforge_pgadmin_data`）
- `depends_on.postgres` 使用 `condition: service_healthy`

## 5. 验收

```bash
docker compose up -d
docker ps --filter name=askforge-pgadmin --format '{{.Names}} {{.Status}}'
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8089/login
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:9011
# Postgres 映射仍在
nc -z 127.0.0.1 5433 && echo ok
```

手动：浏览器打开 `http://127.0.0.1:8089`，用本地 `.env` 的邮箱/密码登录；添加 Server（Host=`askforge-postgres` Port=`5432`）；确认可见 `documents` / `chunks`。

执行过程记入同目录 `execution-log.md`。
