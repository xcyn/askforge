# Design: unify-askforge-branding

## 决策

| 项 | 选择 | 原因 |
|----|------|------|
| 样式前缀 | `af-` | 与品牌 AskForge、localStorage `af_` 一致 |
| 文档措辞 | 写「当前前端壳 / 能力」 | 功能规格不变，表述自洽 |
| 合法署名 | 保留 | 版权 / 许可声明需保留 |

## 影响面

- `frontend/src/index.css` 与 layouts/pages 中的样式标识
- minimal-rag / add-compose-guis 中若干能力描述句
- 本 change 的 OpenSpec 与 superpowers 文档
