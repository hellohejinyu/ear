import { Form, Input, Modal } from 'antd'
import React, { useState } from 'react'

const DownloadModal = ({ visible, onCancel, onOk }) => {
  const [formData, setFormData] = useState({
    url: '',
  })
  // 光标聚焦时，选中内容
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select()
  }
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      mask={false}
      maskClosable={false}
      title='新建下载任务'
      okText='确定'
      cancelText='取消'
      closable={false}
      onOk={() => {
        window.JSBridge.downloadFile(formData)
        onOk()
      }}
    >
      <Form>
        <Form.Item>
          <Input
            value={formData?.url}
            placeholder='下载链接，支持 ear:// http(s):// 协议'
            onChange={e => {
              setFormData({
                ...formData,
                url: e.target.value
              })
            }}
            onFocus={handleFocus}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default DownloadModal
