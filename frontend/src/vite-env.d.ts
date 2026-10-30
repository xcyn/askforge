/**
 * Vite 环境类型补充：声明可用的 import.meta.env 字段。
 */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** API 前缀，默认 /api（由 vite proxy 转到 Nest） */
  readonly VITE_API_BASE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
