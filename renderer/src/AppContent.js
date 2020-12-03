import React from 'react';
import { Layout, Empty, Progress } from 'antd';
import { FolderOutlined } from '@ant-design/icons'
import './AppContent.css';

const { Content } = Layout;

const AppContent = ({ activeTab, list }) => {
  return (
    <Content className='content'>
      {
        list.length === 0 && <Empty className='empty' description={activeTab === 'downloading' ? '没有正在下载任务' : '没有已完成任务'} />
      }
      {
        list.length > 0 && (
          <ul>
            {
              list.map((item, index) => (
                <li key={index}>
                  <div className='icon' style={item.icon ? { backgroundImage: `url(${item.icon})` } : {}} />
                  <div className='right'>
                    <div>{item.filename}</div>
                    <div style={{ color: '#aaa', fontSize: 12, marginTop: 12 }}>
                      {(item.totalBytes / 1024 / 1024).toFixed(1)}MB 已下载{Math.floor(item.receivedBytes / item.totalBytes * 100)}%
                    </div>
                    <Progress
                      showInfo={false}
                      size='small'
                      percent={Math.floor(item.receivedBytes / item.totalBytes * 100)}
                    />
                    {
                      item.receivedBytes === item.totalBytes &&
                        <FolderOutlined
                          onClick={() => {
                            window.JSBridge.openFileFolder(item.savePath)
                          }}
                          style={{
                            right: 0,
                            top: 24,
                            fontSize: 24,
                            color: '#1890ff',
                            position: 'absolute',
                            cursor: 'point'
                          }}
                        />
                    }
                  </div>
                </li>
              ))
            }
          </ul>
        )
      }
    </Content>
  )
}

export default AppContent;
