import React from 'react';
import { Card, Typography, Button, Space, Divider } from 'antd';
import { HomeOutlined, GithubOutlined,GitlabOutlined, MailOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

const AboutUsPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ maxWidth: 800, margin: '0 auto' }}
    >
      <Card
        style={{
          borderRadius: 16,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          background: 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)'
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <div style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                color: 'white',
                fontSize: 32
              }}>
                📝
              </div>
            </motion.div>
            
            <Title level={2} style={{ marginBottom: 8 }}>
              Beautiful TodoList App
            </Title>
            <Text type="secondary" style={{ fontSize: 16 }}>
              A modern, responsive todo application built with React
            </Text>
          </div>

          <Divider />

          <div>
            <Title level={3}>About This Project</Title>
            <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
              This is a feature-rich todo application built with React, Ant Design, and Framer Motion. 
              It demonstrates modern web development practices including:
            </Paragraph>
            
            <ul style={{ fontSize: 16, lineHeight: 1.8, paddingLeft: 24 }}>
              <li>🎨 Beautiful UI with Ant Design components</li>
              <li>🚀 Smooth animations with Framer Motion</li>
              <li>📱 Responsive design for all devices</li>
              <li>🔄 State management with React Context</li>
              <li>🛣️ Client-side routing with React Router</li>
              <li>🌐 RESTful API integration</li>
              <li>✨ Modern React hooks and patterns</li>
            </ul>
          </div>

          <Divider />

          <div>
            <Title level={3}>Features</Title>
            <Space direction="vertical" size="middle">
              <Text>✅ Create, read, update, and delete todos</Text>
              <Text>✅ Mark todos as complete/incomplete</Text>
              <Text>✅ View detailed todo information</Text>
              <Text>✅ Filter completed todos</Text>
              <Text>✅ Responsive design for mobile and desktop</Text>
              <Text>✅ Beautiful animations and transitions</Text>
            </Space>
          </div>

          <Divider />

          <div>
            <Title level={3}>Tech Stack</Title>
            <Space wrap>
              <Text code>React 18</Text>
              <Text code>Ant Design 5</Text>
              <Text code>Framer Motion</Text>
              <Text code>React Router</Text>
              <Text code>React Context</Text>
              <Text code>CSS3</Text>
            </Space>
          </div>

          <Divider />

          <div style={{ textAlign: 'center' }}>
            <Title level={3}>Connect With Us</Title>
            <Space size="large">
              <Button 
                type="primary" 
                icon={<HomeOutlined />}
                onClick={() => navigate('/')}
                size="large"
              >
                Back to App
              </Button>
              <Button 
                icon={<GithubOutlined />}
                size="large"
                href="https://github.com"
                target="_blank"
              >
                GitHub
              </Button>
              <Button 
                icon={<GitlabOutlined/>}
                size="large"
                href="https://gitlab.com"
                target="_blank"
              >
                GitLab
              </Button>
              <Button 
                icon={<MailOutlined />}
                size="large"
                href="mailto:jonny.zhou@oocl.com"
              >
                Email
              </Button>
            </Space>
          </div>
        </Space>
      </Card>
    </motion.div>
  );
};

export default AboutUsPage;