import React from 'react';
import { Card, Typography, List, Tag, Empty } from 'antd';
import { CheckCircleOutlined, TrophyOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useTodoContext } from '../contexts/TodoContext';

const { Title, Text } = Typography;

const DonePage = () => {
  const { state } = useTodoContext();
  const { todos } = state;
  
  const completedTodos = todos.filter(todo => todo.done);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

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
          background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
          border: 'none',
          marginBottom: 24,
          color: 'white'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <TrophyOutlined style={{ fontSize: 48, color: 'white', marginBottom: 16 }} />
          <Title level={2} className={'custom-title'}>
            Completed Tasks
          </Title>
          <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16 }}>
            Great job! You've completed {completedTodos.length} task{completedTodos.length !== 1 ? 's' : ''}
          </Text>
        </div>
      </Card>

      {completedTodos.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Empty 
            description="No completed tasks yet. Keep going!"
            style={{ padding: '60px 0' }}
          />
        </motion.div>
      ) : (
        <Card style={{ borderRadius: 16, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <List
              dataSource={completedTodos}
              renderItem={(todo) => (
                <motion.div variants={itemVariants}>
                  <List.Item
                    style={{
                      padding: '16px 0',
                      borderBottom: '1px solid #f0f0f0'
                    }}
                  >
                    <List.Item.Meta
                      avatar={
                        <CheckCircleOutlined 
                          style={{ 
                            fontSize: 24, 
                            color: '#52c41a',
                            marginTop: 4
                          }} 
                        />
                      }
                      title={
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <Text strong style={{ fontSize: 16 }}>
                            {todo.text || todo.title}
                          </Text>
                          <Tag color="success" style={{ borderRadius: 12 }}>
                            Done
                          </Tag>
                        </div>
                      }
                      description={
                        <Text type="secondary">
                          {todo.body || 'No description available'}
                        </Text>
                      }
                    />
                  </List.Item>
                </motion.div>
              )}
            />
          </motion.div>
        </Card>
      )}
    </motion.div>
  );
};

export default DonePage;