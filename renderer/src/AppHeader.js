import React, { useEffect, useState } from 'react';
import { Layout, Button } from 'antd';
import cn from 'classnames';
import {
  PlusOutlined,
  ThunderboltOutlined,
  ThunderboltFilled,
  CheckCircleOutlined,
  CheckCircleFilled,
} from '@ant-design/icons'
import './AppHeader.css';
import DownloadModal from './DownloadModal';

const { Header } = Layout;

const IconButton = ({ active, icon, text, activeIcon, onClick }) => {
  const Icon = active ? activeIcon : icon;
  return (
    <div className={cn('icon-button', { active: active })} onClick={onClick}>
      <Icon className='icon' />
      <span className='text'>{text}</span>
    </div>
  )
}

const AppHeader = ({ onActiveTabChange }) => {
  const [activeTab, setActiveTab] = useState('downloading')
  const [downloadModalVisible, setDownloadModalVisible] = useState(false)
  useEffect(() => {
    onActiveTabChange(activeTab)
  }, [activeTab])
  return (
    <Header className='header'>
      <DownloadModal visible={downloadModalVisible} onCancel={() => { setDownloadModalVisible(false) }} />
      <div className='header-left-buttons'>
        <Button
          icon={<PlusOutlined />}
          size='small'
          style={{ width: 32 }}
          onClick={() => {
            setDownloadModalVisible(true)
          }}
        />
      </div>
      <div className='header-tabs'>
        <IconButton 
          icon={ThunderboltOutlined}
          activeIcon={ThunderboltFilled}
          text='正在下载'
          active={activeTab === 'downloading'}
          onClick={() => {
            setActiveTab('downloading')
          }}
        />
        <IconButton
          icon={CheckCircleOutlined}
          activeIcon={CheckCircleFilled}
          active={activeTab === 'finish'}
          text='已完成'
          onClick={() => {
            setActiveTab('finish')
          }}
        />
      </div>
    </Header>
  )
}

export default AppHeader;
