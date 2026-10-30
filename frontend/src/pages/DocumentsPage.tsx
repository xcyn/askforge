/**
 * 文档列表：拉取全部 active 文档；点行进详情；可新建/刷新。
 */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Space, Table, message } from 'antd'
import { documentApi } from '../api'
import { ApiError } from '../api/client'
import type { DocumentItem } from '../types'

function formatTime(value: string) {
  try {
    return new Date(value).toLocaleString('zh-CN')
  } catch {
    return value
  }
}

export default function DocumentsPage() {
  const navigate = useNavigate()
  const [items, setItems] = useState<DocumentItem[]>([])
  const [loading, setLoading] = useState(false)

  async function load() {
    setLoading(true)
    try {
      setItems(await documentApi.list())
    } catch (error) {
      message.error(error instanceof ApiError ? error.message : '加载失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
  }, [])

  return (
    <div className="af-page">
      <h2 style={{ marginTop: 0 }}>文档</h2>
      <p className="af-access-hint">创建和管理知识库正文；保存后会同步切块并写入向量，供问答检索。</p>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => navigate('/documents/new')}>
          新建文档
        </Button>
        <Button onClick={() => void load()}>刷新</Button>
      </Space>
      <Table
        rowKey="id"
        loading={loading}
        dataSource={items}
        pagination={false}
        onRow={(record) => ({
          onClick: () => navigate(`/documents/${record.id}`),
          style: { cursor: 'pointer' },
        })}
        columns={[
          { title: '标题', dataIndex: 'title' },
          {
            title: '更新时间',
            dataIndex: 'updatedAt',
            width: 200,
            render: (value: string) => formatTime(value),
          },
        ]}
      />
    </div>
  )
}
