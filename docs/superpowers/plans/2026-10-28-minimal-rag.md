# Plan: AskForge 最小 RAG（2026-10-28）

## 步骤

1. 写入 OpenSpec change 与本 design/plan（已完成则勾选）
2. 根目录 `docker-compose.yml`、`.env.example`、`backend/init-scripts/postgresql/init.sql`
3. 初始化 `backend` Nest 工程：依赖、Config、TypeORM、实体
4. 实现 `auth` stub（JWT）、`document` CRUD + 索引重建、`ai`（chunk/embed/retrieve/chat）
5. 落地 `frontend/`：AskForge 品牌壳、文档与问答页，对接后端 API
6. 更新 README；`docker compose up -d`；Nest boot；curl 创建文档与问答；前端冒烟

## 验收

- Compose 中 Postgres / MinIO 健康
- Nest 无启动致命错误
- curl：登录 → 建文档 → DB 有 embedding → `/ai/chat` 返回 answer/sources
- 前端品牌与文案为 AskForge
- 仓库无 `*.spec.ts`

## 冒烟 curl（占位，实现后按实际端口）

```bash
# 从仓库根目录执行；凭据只在本地 .env 配置。
set -a; source .env; set +a
TOKEN=$(curl -s -X POST http://127.0.0.1:3000/auth/login \
  -H 'Content-Type: application/json' \
  -d "$(python3 -c 'import json,os; print(json.dumps({"username":os.environ["DEMO_USERNAME"],"password":os.environ["DEMO_PASSWORD"]}))')" \
  | python3 -c 'import sys,json; print(json.load(sys.stdin)["accessToken"])')

curl -s -X POST http://127.0.0.1:3000/documents \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"title":"问候","body":"AskForge 是用于学习 RAG 的知识库。"}'

curl -s -X POST http://127.0.0.1:3000/ai/chat \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"content":"AskForge 是什么？","topK":3}'
```
