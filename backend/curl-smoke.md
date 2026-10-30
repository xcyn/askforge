# 后端冒烟

前提：`docker compose up -d`，`.env` 已配置 `OPENAI_*`，`npm run start:dev`。

```bash
# 从仓库根目录执行；从本地 .env 读取演示账号。
set -a; source .env; set +a
TOKEN=$(curl -s -X POST http://127.0.0.1:3000/auth/login \
  -H 'Content-Type: application/json' \
  -d "$(python3 -c 'import json,os; print(json.dumps({"username":os.environ["DEMO_USERNAME"],"password":os.environ["DEMO_PASSWORD"]}))')" \
  | python3 -c 'import sys,json; print(json.load(sys.stdin)["accessToken"])')

curl -s -X POST http://127.0.0.1:3000/documents \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"title":"问候","body":"AskForge 是用于学习 RAG 的知识库。"}' | python3 -m json.tool

curl -s -X POST http://127.0.0.1:3000/ai/chat \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"content":"AskForge 是什么？","topK":3}' | python3 -m json.tool
```
