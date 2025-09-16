import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Layout, Menu, Typography, Button } from 'antd';
import {
  CheckSquareOutlined,
  HomeOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  GithubOutlined,
  HeartOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './FooterAnimations.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const DefaultLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Todo List',
    },
    {
      key: '/done',
      icon: <CheckCircleOutlined />,
      label: 'Completed',
    },
    {
      key: '/about',
      icon: <InfoCircleOutlined />,
      label: 'About Us',
    },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '0 50px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%'
        }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <CheckSquareOutlined style={{ fontSize: '24px', color: 'white', marginRight: '12px' }} />
            <Title level={3} style={{ margin: 0, color: 'white'  }} className={'custom-title'}>
              Beautiful TodoList
            </Title>
          </motion.div>

          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={handleMenuClick}
            style={{
              background: 'transparent',
              border: 'none',
              minWidth: '300px'
            }}
          />
        </div>
      </Header>

      <Content style={{
        padding: '24px 50px',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        minHeight: 'calc(100vh - 134px)'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Outlet />
        </motion.div>
      </Content>

      <Footer style={{ 
          textAlign: 'center',
          background: 'transparent',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          padding: 0
        }}>
          <div className="footer-container">
            <div className="floating-elements"></div>
            <div className="footer-content">
              <Typography.Text 
                className="footer-text"
                style={{ 
                  color: '#e6e6e6',
                  fontSize: '13px',
                  fontWeight: '400'
                }}
              >
                Built with{' '}
                <span className="heart-container">
                  <HeartOutlined 
                    className="heart-icon"
                    style={{ 
                      color: '#ff6b6b', 
                      fontSize: '16px',
                      animation: 'heartbeat 2.5s ease-in-out infinite',
                      transition: 'all 0.3s ease'
                    }} 
                  />
                </span>
                {' '}by Jonny & GitHub Copilot © 2025
              </Typography.Text>
            </div>
          </div>
        </Footer>
    </Layout>
  );
};

export default DefaultLayout;