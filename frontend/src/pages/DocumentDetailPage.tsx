/**
 * 文档详情：Markdown 渲染正文；支持编辑跳转与二次确认删除。
 */
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Empty, Popconfirm, Space, Spin, Typography, message } from 'antd'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { documentApi } from '../api'
import { ApiError } from '../api/client'
import type { DocumentItem } from '../types'

export default function DocumentDetailPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const [doc, setDoc] = useState<DocumentItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    documentApi
      .get(id)
      .then(setDoc)
      .catch((error) => {
        setDoc(null)
        message.error(error instanceof ApiError ? error.message : '加载失败')
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="af-page">
        <Spin />
      </div>
    )
  }

  if (!doc) {
    return (
      <div className="af-page">
        <Empty description="文档不存在或已删除">
          <Button onClick={() => navigate('/documents')}>返回列表</Button>
        </Empty>
      </div>
    )
  }

  return (
    <div className="af-page">
      <Space style={{ marginBottom: 12 }} wrap>
        <Button onClick={() => navigate('/documents')}>返回列表</Button>
        <Button onClick={() => navigate(`/documents/${id}/edit`)}>编辑</Button>
        <Popconfirm
          title="确认删除该文档？"
          onConfirm={async () => {
            try {
              await documentApi.remove(id)
              message.success('已删除')
              navigate('/documents')
            } catch (error) {
              message.error(error instanceof ApiError ? error.message : '删除失败')
            }
          }}
        >
          <Button danger>删除</Button>
        </Popconfirm>
      </Space>
      <Typography.Title level={3} style={{ marginTop: 0 }}>
        {doc.title}
      </Typography.Title>
      {/* GFM：表格/任务列表等；空正文显示斜体占位 */}
      <div className="af-md">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{doc.body || '_暂无正文_'}</ReactMarkdown>
      </div>
    </div>
  )
}
