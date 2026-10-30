# Proposal: add-compose-guis

## 为什么做

本地调试文档与向量数据时，仅靠 `docker exec … psql` 不够直观。需要在 Compose 中增加 Postgres 图形管理端，方便查看 `documents` / `chunks`。

## 做什么

- Compose 增加 `pgadmin`（`dpage/pgadmin4`），宿主端口 `8089`
- `.env.example` 增加 pgAdmin 登录环境变量
- README / v1 摘要写明访问方式与容器内连库地址

## 不做什么

- 不为 MinIO 另加客户端镜像（已有内置 Console `:9011`）
- 不改 Nest / 前端业务代码
- 不预置 pgAdmin 自动注册 Server（首次在 UI 中手动添加）

## 成功标准

见同目录 `tasks.md`；可执行步骤见 `docs/superpowers/plans/2026-10-28-compose-guis.md`。
