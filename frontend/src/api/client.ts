/**
 * 通用 fetch 封装：自动带 Bearer、解析 Nest 错误 message、401 清登录态。
 * 基址 VITE_API_BASE 或 '/api'（开发代理 strip 前缀后打到 :3000）。
 */
import { clearAuth, getAccessToken } from '../auth'

const API_BASE = import.meta.env.VITE_API_BASE || '/api'

/** 带 HTTP 状态的业务错误，页面用 message.error 展示 */
export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

/** 兼容 Nest 字符串或校验错误数组 */
function errorMessage(body: unknown, fallback: string) {
  if (!body || typeof body !== 'object') return fallback
  const message = (body as { message?: unknown }).message
  if (typeof message === 'string') return message
  if (Array.isArray(message)) return message.filter((x) => typeof x === 'string').join('；')
  return fallback
}

export async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers)
  if (!headers.has('Content-Type') && init.body) {
    headers.set('Content-Type', 'application/json')
  }
  const token = getAccessToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers })

  // 登录接口自身的 401 不在这里清态，避免误伤
  if (res.status === 401 && !path.startsWith('/auth/login')) {
    clearAuth()
    throw new ApiError(401, '未登录或登录已过期')
  }

  const text = await res.text()
  const data = text ? (JSON.parse(text) as unknown) : null
  if (!res.ok) {
    throw new ApiError(res.status, errorMessage(data, res.statusText || '请求失败'))
  }
  return data as T
}

export function get<T>(path: string) {
  return request<T>(path)
}

export function post<T>(path: string, body?: unknown) {
  return request<T>(path, {
    method: 'POST',
    body: body === undefined ? undefined : JSON.stringify(body),
  })
}

export function patch<T>(path: string, body?: unknown) {
  return request<T>(path, {
    method: 'PATCH',
    body: body === undefined ? undefined : JSON.stringify(body),
  })
}

export function del<T>(path: string) {
  return request<T>(path, { method: 'DELETE' })
}
