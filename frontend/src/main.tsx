/**
 * 前端入口：挂载 React 根节点。
 * 外层 Ant Design 中文 locale + 主题主色；内层 BrowserRouter 承载路由。
 */
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider, App as AntdApp } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <ConfigProvider
    locale={zhCN}
    theme={{
      token: {
        colorPrimary: '#e8b20a', // 与 BrandLogo / CSS 变量一致的品牌黄
        borderRadius: 16,
      },
    }}
  >
    {/* AntdApp 提供 message/modal 等静态方法所需的上下文 */}
    <AntdApp>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AntdApp>
  </ConfigProvider>,
)
