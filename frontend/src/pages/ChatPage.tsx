/**
 * 精简问答页：输入问题 → POST /ai/chat → 展示 Markdown 回答与可点击引用。
 * 非流式；topK 固定 5。
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Input, List, Space, Typography, message } from 'antd'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { aiApi } from '../api'
import { ApiError } from '../api/client'
import type { ChatResult } from '../types'

export default function ChatPage() {
  const navigate = useNavigate()
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ChatResult | null>(null)

  async function ask() {
    const content = question.trim()
    if (!content) {
      message.warning('请输入问题')
      return
    }
    setLoading(true)
    try {
      setResult(await aiApi.chat(content, 5))
    } catch (error) {
      message.error(error instanceof ApiError ? error.message : '问答失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="af-page">
      <h2 style={{ marginTop: 0 }}>知识库问答</h2>
      <p className="af-access-hint">先在「文档」写入内容，再在这里提问。回答基于向量检索的上下文。</p>
      <Space.Compact style={{ width: '100%', marginBottom: 16 }}>
        <Input
          size="large"
          value={question}
          placeholder="例如：AskForge 是什么？"
          onChange={(e) => setQuestion(e.target.value)}
          onPressEnter={() => void ask()}
        />
        <Button type="primary" size="large" loading={loading} onClick={() => void ask()}>
          提问
        </Button>
      </Space.Compact>

      {result ? (
        <>
          <Card title="回答" style={{ marginBottom: 16 }}>
            <div className="af-md">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{result.answer}</ReactMarkdown>
            </div>
          </Card>
          <Card title="引用">
            {result.sources.length === 0 ? (
              <Typography.Text type="secondary">无检索命中</Typography.Text>
            ) : (
              <List
                dataSource={result.sources}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <Button
                          type="link"
                          style={{ padding: 0 }}
                          onClick={() => navigate(`/documents/${item.documentId}`)}
                        >
                          {/* 后端 ordinal 从 0；展示用 +1 */}
                          {item.title} · 片段 {item.chunkOrdinal + 1}
                        </Button>
                      }
                      description={item.snippet}
                    />
                  </List.Item>
                )}
              />
            )}
          </Card>
        </>
      ) : null}
    </div>
  )
}
