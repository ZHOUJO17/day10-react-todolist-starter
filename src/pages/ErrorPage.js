import React from 'react';
import { Result, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '60vh'
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button 
            type="primary" 
            icon={<HomeOutlined />}
            size="large"
            onClick={() => navigate('/')}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: 8
            }}
          >
            Back to Todo List
          </Button>
        }
        style={{
          background: 'white',
          borderRadius: 16,
          padding: '40px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}
      />
    </motion.div>
  );
};

export default ErrorPage;