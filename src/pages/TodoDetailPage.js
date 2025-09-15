import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Card, Typography, Button, Tag, Space, Divider } from 'antd';
import { 
  ArrowLeftOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined,
  EditOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Paragraph, Text } = Typography;

const TodoDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const todo = location.state?.todo;

  if (!todo) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <Title level={3}>Todo not found</Title>
          <Button type="primary" onClick={() => navigate('/')}>
            Back to Todo List
          </Button>
        </Card>
      </motion.div>
    );
  }

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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button 
              type="text" 
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/')}
              style={{ padding: '4px 8px' }}
            >
              Back to List
            </Button>
            <Button 
              type="primary" 
              icon={<EditOutlined />}
              onClick={() => navigate('/', { state: { editTodo: todo } })}
            >
              Edit Todo
            </Button>
          </div>

          <div>
            <Title level={2} style={{ marginBottom: 16 }}>
              {todo.text || todo.title}
            </Title>
            
            <Tag 
              icon={todo.done ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
              color={todo.done ? 'success' : 'processing'}
              style={{ marginBottom: 16, borderRadius: 16, padding: '4px 12px' }}
            >
              {todo.done ? 'Completed' : 'Pending'}
            </Tag>
          </div>

          <Divider />

          <div>
            <Title level={4} style={{ color: '#666' }}>Description</Title>
            <Paragraph style={{ fontSize: 16, lineHeight: 1.6 }}>
              {todo.body || 'No description provided for this todo item.'}
            </Paragraph>
          </div>

          <Divider />

          <div>
            <Title level={4} style={{ color: '#666' }}>Details</Title>
            <Space direction="vertical">
              <Text><strong>ID:</strong> {todo.id}</Text>
              <Text><strong>Status:</strong> {todo.done ? 'Completed' : 'Pending'}</Text>
            </Space>
          </div>
        </Space>
      </Card>
    </motion.div>
  );
};

export default TodoDetailPage;