/**
 * 与后端 JSON 契约对齐的前端类型（字段名 camelCase）。
 */

/** /auth/login、/auth/me 返回的用户 */
export type AuthUser = {
  id: string
  username: string
  displayName: string
}

/** 文档列表/详情项 */
export type DocumentItem = {
  id: string
  title: string
  body: string
  status: string
  createdAt: string
  updatedAt: string
}

/** 问答引用片段 */
export type ChatSource = {
  documentId: string
  title: string
  chunkOrdinal: number
  snippet: string
}

/** POST /ai/chat 响应 */
export type ChatResult = {
  answer: string
  sources: ChatSource[]
}
