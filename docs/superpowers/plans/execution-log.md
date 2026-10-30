# Execution log — 2026-10-28-minimal-rag

- OpenSpec / design / plan 已写入
- Compose：Postgres(`5433`) + MinIO(`9010/9011`，chainguard 镜像)；官方 minio 镜像在当前镜像源下不可用
- Nest：`nest build` 通过；`start:dev` 成功；`POST /auth/login` 返回 201 + token
- 前端：`tsc` / `vite build` 自检
- 完整 RAG curl（依赖真实 `OPENAI_API_KEY`）需本地填 `.env` 后按 `backend/curl-smoke.md` 再验
- 2026-10-28：切换 DashScope compatible-mode；`vector(1024)`；建文档+问答冒烟通过
- 2026-10-28：全源码学习注释（annotate-learning-source）；nest/vite build 通过；登录/文档/问答冒烟行为正常

# Execution log — 2026-10-28-compose-guis

- 2026-10-29：新增 `askforge-pgadmin`，镜像 `dpage/pgadmin4:latest`、端口 `8089:80`、独立数据卷；保留 MinIO 内置 Console `9011`。
- 首次启动失败：pgAdmin 拒绝 `.local` 保留域名作为登录邮箱；改用有效邮箱后重建容器并启动成功。
- `docker compose config --quiet` / `docker compose up -d` 通过；pgAdmin `/login`、MinIO Console 与 MinIO API 健康接口均返回 HTTP 200；Postgres `5433` 连通，表 `documents` / `chunks` 存在。
- 用本地配置的账号在 pgAdmin 网页成功登录；从 pgAdmin 容器连接数据库，列出 `documents` / `chunks`（网页手工注册 Server 留给使用者）。
- 后端 `npm run build` 通过；短暂启动 Nest，日志确认应用启动且 TypeORM 初始化。

# Execution log — 2026-10-29-unify-branding

- 前端 `frontend/src`：样式类名 / CSS 变量 / keyframes / TSX className 统一为 `af-`；`index.css` 头注释为 AskForge 当前样式说明。
- 文档表述统一：`2026-10-28-minimal-rag` plan/design、`bootstrap-minimal-rag/proposal`、`add-compose-guis/design`；新增 `openspec/changes/unify-askforge-branding/` 与对应 design/plan。
- 复查：可维护源码与文档均以 AskForge 自身命名与能力描述呈现（合法第三方许可署名除外）。
- `frontend` `npm run build` 通过；`backend` `npm run build` + 短暂 Nest boot 成功；Compose `postgres`/`minio`/`pgadmin` 均 Up。
- 未做浏览器逐页像素对比；仅统一命名前缀，样式数值未改，布局预期不变。

# Execution log — 2026-10-30-credential-and-style-cleanup

- 删除未被当前页面引用的仪表盘、搜索、图谱与轨迹样式；当前页面 CSS 保留应用布局、文档/问答 Markdown 与登录样式。
- Docker Compose、数据库连接、演示登录与 JWT 使用本地环境变量；示例环境文件仅保留占位符，页面不预填登录账号。
- `docker compose config --quiet`、`docker compose up -d --no-recreate`（本机补齐未配置的 MinIO 变量以验证旧容器）、前后端 `npm run build` 通过；本地后端登录接口返回 HTTP 201。
- 本机 `.env` 缺少 `MINIO_ROOT_*`；全新启动前需在本地填入，未将任何账号或密钥写入提交文件。
