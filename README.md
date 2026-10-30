# AskForge

用于学习 RAG 的知识库项目：写入文档、向量检索、基于上下文问答。

技术栈：NestJS、PostgreSQL（pgvector）、MinIO（Compose 预置，v1 未接）、Docker Compose、OpenAI 兼容 API、Vite + React + Ant Design。

## 文档

- 前后端架构总览：[ARCHITECTURE.md](ARCHITECTURE.md)
- 给协作者 / Agent 的约定：[AGENTS.md](AGENTS.md)
- 开发流程：[docs/agents/dev-flow.md](docs/agents/dev-flow.md)
- v1 规格摘要：[docs/specs/v1.md](docs/specs/v1.md)
- 当前 change：[openspec/changes/bootstrap-minimal-rag/](openspec/changes/bootstrap-minimal-rag/)、[add-compose-guis](openspec/changes/add-compose-guis/)

## 环境要求

- Node.js 20+（推荐 22）
- Docker Desktop / Docker Compose
- OpenAI 兼容的 Embedding / Chat API（默认对接阿里云 DashScope `compatible-mode`）

## 本地启动

```bash
# 1. 依赖中间件
cp .env.example .env   # 填写本地数据库、管理端、MinIO、演示登录与 AI 密钥
# 如已存在 backend/.env，保持与根目录 .env 一致；后端优先读取 backend/.env
docker compose up -d
# Postgres → 本机 5433；MinIO API/Console → 9010/9011（v1 应用不连接）
# pgAdmin → http://127.0.0.1:8089（登录邮箱与密码来自本地 .env）
# 默认模型：text-embedding-v3（1024 维）+ qwen-plus

# 2. 后端
cd backend
npm install
npm run start:dev      # http://127.0.0.1:3000

# 3. 前端
cd ../frontend
npm install
npm run dev            # http://127.0.0.1:5173（端口占用时可加 -- --port 5174）
```

### 后端调试（Cursor / VS Code）

1. 先停掉已占用 `3000` / `9229` 的旧后端进程。
2. 打开「运行和调试」，优先选 **「AskForge 后端：启动并调试」** 后按 F5（会起 `start:debug` 并自动附着子进程）。
3. 若终端已手动跑 `npm run start:debug`，改选 **「AskForge 后端调试（连接 9229）」** 再连接。
4. 在 `backend/src` 源码打断点后，通过前端新建/保存文档或 `POST /documents` 触发即可命中。

演示账号与密钥均从本地 `.env` 读取；`.env.example` 仅提供占位符，请勿提交 `.env`。若 PostgreSQL / pgAdmin 已使用旧账号初始化数据卷，更改 `.env` 不会自动改掉数据卷中的账号密码。

### 管理端 GUI

| 服务 | 地址 | 说明 |
|------|------|------|
| pgAdmin | http://127.0.0.1:8089 | 邮箱/密码见 `PGADMIN_DEFAULT_*` |
| MinIO Console | http://127.0.0.1:9011 | 登录信息见本地 `.env` 的 `MINIO_ROOT_*` |

在 pgAdmin 中首次添加 Server：Host=`askforge-postgres`，Port=`5432`（容器内端口，不是宿主 `5433`），库名、用户和密码见本地 `.env` 的 `DATABASE_*`。

## 冒烟（curl）

```bash
# 从本地环境读取演示账号；不要在命令行示例中写真实凭据。
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
