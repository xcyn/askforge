/**
 * 登录后壳层：左侧导航（文档/问答）+ 顶栏标题/用户/退出 + Outlet 内容区。
 * 挂载时静默调用 /auth/me 刷新用户展示。
 */
import { useEffect, useMemo, type ReactNode } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { FileTextOutlined, MessageOutlined } from '@ant-design/icons'
import { authApi } from '../api'
import { clearAuth, updateUser, useAuth } from '../auth'
import { BrandLogo } from '../components/BrandLogo'

type NavItem = { key: string; label: string; icon: ReactNode }

/** 根据路径给出顶栏标题文案 */
function pageTitle(pathname: string) {
  if (pathname.startsWith('/documents/new')) return '新建文档'
  if (pathname.includes('/edit')) return '编辑文档'
  if (/^\/documents\/[^/]+$/.test(pathname)) return '文档详情'
  if (pathname.startsWith('/documents')) return '文档'
  if (pathname.startsWith('/chat')) return '问答'
  return 'AskForge'
}

/** 导航高亮：文档相关路径统一点亮「文档」项 */
function navKey(pathname: string) {
  if (pathname.startsWith('/documents')) return '/documents'
  if (pathname.startsWith('/chat')) return '/chat'
  return '/documents'
}

function initials(name: string) {
  const text = name.trim()
  return text ? text.slice(0, 2) : 'AF'
}

export default function AppLayout() {
  const user = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const active = navKey(location.pathname)

  useEffect(() => {
    // 失败忽略：token 失效时由 API 层 401 清态
    authApi.me().then(updateUser).catch(() => undefined)
  }, [])

  const mainNav = useMemo<NavItem[]>(
    () => [
      { key: '/documents', label: '文档', icon: <FileTextOutlined /> },
      { key: '/chat', label: '问答', icon: <MessageOutlined /> },
    ],
    [],
  )

  const name = user?.displayName || user?.username || '用户'

  return (
    <div className="af-root">
      <aside className="af-sider">
        <button className="af-brand" type="button" onClick={() => navigate('/documents')}>
          <BrandLogo />
          <span>
            <b>AskForge</b>
            <small>知识库学习</small>
          </span>
        </button>
        <nav className="af-nav" aria-label="主导航">
          <div className="af-nav-label">主导航</div>
          {mainNav.map((item) => (
            <button
              key={item.key}
              type="button"
              className={active === item.key ? 'af-nav-item active' : 'af-nav-item'}
              onClick={() => navigate(item.key)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
      <div className="af-main">
        <header className="af-header">
          <h1>{pageTitle(location.pathname)}</h1>
          <div className="af-header-right">
            <div className="af-user">
              <span className="af-avatar" aria-hidden>
                {initials(name)}
              </span>
              <span className="af-user-name">{name}</span>
            </div>
            <button
              className="af-logout"
              type="button"
              onClick={() => {
                clearAuth()
                navigate('/login')
              }}
            >
              退出
            </button>
          </div>
        </header>
        <main className="af-content">
          {/* 子路由页面出口 */}
          <Outlet />
        </main>
      </div>
    </div>
  )
}
