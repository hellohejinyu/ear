import 'antd/dist/antd.css';
import { Layout } from 'antd';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('')
  return (
    <Layout style={{ height: '100vh' }}>
      <AppHeader
        onActiveTabChange={(t) => {
          setActiveTab(t)
        }}
      />
      <AppContent activeTab={activeTab} />
    </Layout>
  );
}

export default App;
