import { Form, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { FolderOpenOutlined } from '@ant-design/icons'

const DownloadModal = ({ visible, onCancel }) => {
  const [formData, setFormData] = useState({
    url: '',
    fileName: '',
    path: '',
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
      okText='下载'
      cancelText='取消'
      closable={false}
    >
      <Form labelCol={{ span: 4 }} size='small'>
        <Form.Item label='下载链接：'>
          <Input
            value={formData?.url}
            onChange={e => {
              ///
            }}
            onFocus={handleFocus}
          />
        </Form.Item>
        <Form.Item label='文件名称：'>
          <Input
            value={formData?.fileName}
            onChange={e => {
              ///
            }}
            onFocus={handleFocus}
          />
        </Form.Item>
        <Form.Item label='下载位置：'>
          <Input
            readOnly
            value={formData?.path}
            addonAfter={<FolderOpenOutlined onClick={() => {}} />}
            onClick={() => {
              //
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default DownloadModal
