import React from 'react';
import { Layout, Empty } from 'antd';
import './AppContent.css';

const { Content } = Layout;

const AppContent = ({ activeTab }) => {
  return (
    <Content className='content'>
      <Empty className='empty' description={activeTab === 'downloading' ? '没有正在下载任务' : '没有已完成任务'} />
    </Content>
  )
}

export default AppContent;
