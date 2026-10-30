# Plan — 统一 AskForge 命名与文档表述（2026-10-29）

对应 OpenSpec：`openspec/changes/unify-askforge-branding/`。

## 1. OpenSpec 与本 design/plan

写入 `openspec/changes/unify-askforge-branding/` 与 `docs/superpowers/specs/2026-10-29-unify-branding-design.md`、本文件。

## 2. 前端命名

在 `frontend/src` 将样式类名、CSS 变量、`@keyframes`、TSX `className` 统一为 `af-` 前缀。更新 `index.css` 文件头注释为 AskForge 当前样式说明。

涉及文件：`index.css`、`layouts/AppLayout.tsx`、各 `pages/*.tsx`。

## 3. 文档措辞

改写为 AskForge 自身能力描述：

- `docs/superpowers/plans/2026-10-28-minimal-rag.md`
- `docs/superpowers/specs/2026-10-28-minimal-rag-design.md`
- `openspec/changes/bootstrap-minimal-rag/proposal.md`
- `openspec/changes/add-compose-guis/design.md`

## 4. 验收

```bash
# 确认前端样式标识均为 af-
rg -n 'className=|class="' frontend/src --glob '!**/node_modules/**' | head
rg -n '\.af-|--af-|@keyframes af-' frontend/src/index.css | head

cd frontend && npm run build
cd ../backend && npm run build
docker compose ps
# 短暂 Nest boot（可选）
```

结果记入同目录 `execution-log.md`。
