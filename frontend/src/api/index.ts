/**
 * 按域拆分的 API 表面：auth / documents / ai，路径与后端契约一致。
 */
import { del, get, patch, post } from './client'
import type { AuthUser, ChatResult, DocumentItem } from '../types'

export const authApi = {
  login(username: string, password: string) {
    return post<{ accessToken: string; user: AuthUser }>('/auth/login', {
      username,
      password,
    })
  },
  me() {
    return get<AuthUser>('/auth/me')
  },
}

export const documentApi = {
  list() {
    return get<DocumentItem[]>('/documents')
  },
  get(id: string) {
    return get<DocumentItem>(`/documents/${id}`)
  },
  create(payload: { title: string; body: string }) {
    return post<DocumentItem>('/documents', payload)
  },
  update(id: string, payload: { title?: string; body?: string }) {
    return patch<DocumentItem>(`/documents/${id}`, payload)
  },
  remove(id: string) {
    return del<{ ok: boolean }>(`/documents/${id}`)
  },
}

export const aiApi = {
  /** 非流式问答；topK 可选 */
  chat(content: string, topK?: number) {
    return post<ChatResult>('/ai/chat', { content, topK })
  },
}
