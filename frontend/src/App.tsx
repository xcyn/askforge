/**
 * 路由表：未登录仅 /login；登录后侧栏布局下挂文档与问答。
 * Guard 用 localStorage 用户态决定是否放行。
 */
import { Navigate, Route, Routes } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from './auth'
import AppLayout from './layouts/AppLayout'
import LoginPage from './pages/LoginPage'
import DocumentsPage from './pages/DocumentsPage'
import DocumentDetailPage from './pages/DocumentDetailPage'
import DocumentEditPage from './pages/DocumentEditPage'
import ChatPage from './pages/ChatPage'

/** 未登录跳转登录页；已登录渲染子树 */
function Guard({ children }: { children: ReactNode }) {
  const user = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  const user = useAuth()
  return (
    <Routes>
      {/* 已登录访问 /login 时直接进文档列表 */}
      <Route path="/login" element={user ? <Navigate to="/documents" replace /> : <LoginPage />} />
      <Route
        path="/"
        element={
          <Guard>
            <AppLayout />
          </Guard>
        }
      >
        <Route index element={<Navigate to="/documents" replace />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="documents/new" element={<DocumentEditPage />} />
        <Route path="documents/:id/edit" element={<DocumentEditPage />} />
        <Route path="documents/:id" element={<DocumentDetailPage />} />
        <Route path="chat" element={<ChatPage />} />
      </Route>
      {/* 兜底：按登录态回首页或登录 */}
      <Route path="*" element={<Navigate to={user ? '/documents' : '/login'} replace />} />
    </Routes>
  )
}
