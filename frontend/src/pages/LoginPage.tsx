/**
 * 登录页：账号由使用者输入；成功后写入 auth 并进文档列表。
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Form, Input, message } from 'antd'
import { authApi } from '../api'
import { ApiError } from '../api/client'
import { setAuth } from '../auth'
import { BrandLogo } from '../components/BrandLogo'

export default function LoginPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  return (
    <div className="af-login">
      <Card className="af-login-card">
        <div className="af-login-title">
          <BrandLogo size={40} />
          <h1>AskForge</h1>
          <p>登录后管理文档并用知识库问答</p>
        </div>
        <Form
          layout="vertical"
          onFinish={async (values: { username: string; password: string }) => {
            setLoading(true)
            try {
              const result = await authApi.login(values.username, values.password)
              setAuth({
                accessToken: result.accessToken,
                user: result.user,
              })
              // replace：避免返回键回到登录页
              navigate('/documents', { replace: true })
            } catch (error) {
              message.error(error instanceof ApiError ? error.message : '登录失败')
            } finally {
              setLoading(false)
            }
          }}
        >
          <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
            <Input size="large" placeholder="用户名" />
          </Form.Item>
          <Form.Item name="password" label="密码" rules={[{ required: true }]}>
            <Input.Password size="large" placeholder="密码" />
          </Form.Item>
          <Button type="primary" htmlType="submit" size="large" block loading={loading}>
            登录
          </Button>
        </Form>
      </Card>
    </div>
  )
}
