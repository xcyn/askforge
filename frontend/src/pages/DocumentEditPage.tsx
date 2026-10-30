/**
 * 新建/编辑共用页：无 id 为新建；有 id 则先拉详情填表。
 * 保存成功跳详情；后端会同步重建向量索引。
 */
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Form, Input, Spin, message } from 'antd'
import { documentApi } from '../api'
import { ApiError } from '../api/client'

export default function DocumentEditPage() {
  const { id } = useParams()
  const isNew = !id
  const navigate = useNavigate()
  const [form] = Form.useForm()
  // 新建时无需加载态；编辑时先转圈再展示表单
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!id) return
    documentApi
      .get(id)
      .then((doc) => {
        form.setFieldsValue({ title: doc.title, body: doc.body })
      })
      .catch((error) => {
        message.error(error instanceof ApiError ? error.message : '加载失败')
      })
      .finally(() => setLoading(false))
  }, [id, form])

  if (loading) {
    return (
      <div className="af-page">
        <Spin />
      </div>
    )
  }

  return (
    <div className="af-page">
      <h2 style={{ marginTop: 0 }}>{isNew ? '新建文档' : '编辑文档'}</h2>
      <p className="af-access-hint">正文支持 Markdown。保存后会重新切块并向量化。</p>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ title: '', body: '' }}
        onFinish={async (values: { title: string; body: string }) => {
          setSaving(true)
          try {
            if (isNew) {
              const created = await documentApi.create(values)
              message.success('已创建并完成索引')
              navigate(`/documents/${created.id}`)
            } else if (id) {
              await documentApi.update(id, values)
              message.success('已保存并重建索引')
              navigate(`/documents/${id}`)
            }
          } catch (error) {
            message.error(error instanceof ApiError ? error.message : '保存失败')
          } finally {
            setSaving(false)
          }
        }}
      >
        <Form.Item name="title" label="标题" rules={[{ required: true, message: '请输入标题' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="body" label="正文" rules={[{ required: true, message: '请输入正文' }]}>
          <Input.TextArea rows={16} placeholder="在此输入知识正文…" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={saving}>
            保存
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => navigate(-1)}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
