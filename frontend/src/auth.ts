/**
 * 前端鉴权状态：localStorage + 内存镜像 + useSyncExternalStore 订阅。
 * Key 前缀 af_，与业务品牌一致；无 refresh token（后端 stub 鉴权）。
 */
import { useSyncExternalStore } from 'react'
import type { AuthUser } from './types'

const ACCESS_KEY = 'af_access_token'
const USER_KEY = 'af_user'

/** 模块级当前用户；启动时从 localStorage 恢复 */
let currentUser: AuthUser | null = loadUser()
const listeners = new Set<() => void>()

function loadUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    // 损坏的 JSON 视为未登录
    return null
  }
}

/** 通知所有 useAuth 订阅方重渲染 */
function emit() {
  for (const listener of listeners) listener()
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_KEY)
}

export function getUser() {
  return currentUser
}

/** 登录成功后写入 token 与用户 */
export function setAuth(params: { accessToken: string; user: AuthUser }) {
  localStorage.setItem(ACCESS_KEY, params.accessToken)
  localStorage.setItem(USER_KEY, JSON.stringify(params.user))
  currentUser = params.user
  emit()
}

/** 用 /auth/me 结果刷新展示名等字段 */
export function updateUser(user: AuthUser) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  currentUser = user
  emit()
}

export function clearAuth() {
  localStorage.removeItem(ACCESS_KEY)
  localStorage.removeItem(USER_KEY)
  currentUser = null
  emit()
}

export function subscribeAuth(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** React 钩子：订阅鉴权快照 */
export function useAuth() {
  return useSyncExternalStore(subscribeAuth, getUser)
}
