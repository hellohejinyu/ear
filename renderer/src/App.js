import 'antd/dist/antd.css';
import { Layout, message } from 'antd';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import { useEffect, useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('downloading')
  const [downloadFileList, setDownloadFileList] = useState([])
  const [finishFileList, setFinishFileList] = useState([])
  useEffect(() => {
    window.JSBridge.itemDone(({state, item}) => {
      console.log(state)
      if (state === 'cancelled') {
        setDownloadFileList([])
      }
      if (state === 'completed') {
        message.success('下载完成')
        setDownloadFileList([])
        setFinishFileList([item])
      }
    })
    window.JSBridge.itemUpdated(({state, item}) => {
      console.log(state)
      console.log(item)
      if (state === 'progressing') {
        setDownloadFileList([item])
      }

    })
  }, [])
  return (
    <Layout style={{ height: '100vh' }}>
      <AppHeader
        activeTab={activeTab}
        onActiveTabChange={(t) => {
          setActiveTab(t)
        }}
      />
      <AppContent
        activeTab={activeTab}
        list={activeTab === 'downloading' ? downloadFileList : finishFileList}
      />
    </Layout>
  );
}

export default App;
