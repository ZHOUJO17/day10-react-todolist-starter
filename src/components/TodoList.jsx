import React, { useState, useEffect } from 'react';
import {
  Card,
  List,
  Button,
  Modal,
  Form,
  Input,
  Checkbox,
  Space,
  Typography,
  Tag,
  Tooltip,
  message,
  Spin,
  Empty,
  Popconfirm
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useTodoContext } from '../contexts/TodoContext';
import { useNavigate } from 'react-router-dom';
import './TodoList.css';

const { Title, Text } = Typography;
const { TextArea } = Input;

const TodoList = () => {
  const { state, actions } = useTodoContext();
  const { todos, loading, error } = state;
  const { loadTodos, addTodo, updateTodo, deleteTodo } = actions;
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const showModal = (todo = null) => {
    setEditingTodo(todo);
    setIsModalVisible(true);
    if (todo) {
      form.setFieldsValue({
        title: todo.text || todo.title,
        body: todo.body,
        done: todo.done
      });
    } else {
      form.resetFields();
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      if (editingTodo) {
        await updateTodo(editingTodo.id, {
          ...editingTodo,
          text: values.title,
          body: values.body,
          done: values.done || false
        });
        message.success('Todo updated successfully!');
      } else {
        await addTodo({
          text: values.title,
          body: values.body,
          done: false
        });
        message.success('Todo added successfully!');
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditingTodo(null);
    } catch (error) {
      message.error('Please fill in all required fields');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingTodo(null);
  };

  const toggleComplete = async (todo) => {
    await updateTodo(todo.id, { ...todo, done: !todo.done });
    message.success(`Todo marked as ${!todo.done ? 'completed' : 'pending'}`);
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    message.success('Todo deleted successfully!');
  };

  const viewTodo = (todo) => {
    navigate(`/todo/${todo.id}`, { state: { todo } });
  };

  if (error) {
    message.error(`Error: ${error}`);
  }

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
      <div className="todo-container">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
          <Card
              className="todo-header-card"
              style={{
                marginBottom: 24,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: 16
              }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Title level={2} className={'custom-title'}>
                  My Todo List
                </Title>
                <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
                  Manage your tasks efficiently
                </Text>
              </div>
              <Button
                  type="primary"
                  size="large"
                  icon={<PlusOutlined />}
                  onClick={() => showModal()}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    backdropFilter: 'blur(10px)'
                  }}
              >
                Add New Todo
              </Button>
            </div>
          </Card>
        </motion.div>

      <Spin spinning={loading}>
        {!loading && todos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Empty 
              description="No todos yet. Create your first one!"
              style={{ padding: '60px 0' }}
            />
          </motion.div>
        ) : todos.length > 0 ? (
          <motion.div
            key={`todos-container-${!loading && todos.length > 0}`}
            variants={containerVariants}
            initial="hidden"
            animate={!loading && todos.length > 0 ? "visible" : "hidden"}
            style={{ 
              opacity: 1, 
              minHeight: '100px'
            }}
          >
            <List
              grid={{ 
                gutter: 16,
                xs: 1,
                sm: 1, 
                md: 2,
                lg: 2,
                xl: 3,
                xxl: 3
              }}
              dataSource={todos}
              renderItem={(todo) => (
                <motion.div 
                  variants={itemVariants} 
                  key={todo.id}
                  style={{ opacity: 1 }}
                >
                  <List.Item>
                    <Card 
                      className={`todo-card ${todo.done ? 'completed' : ''}`}
                      hoverable
                      style={{ 
                        height: '100%',
                        borderRadius: 12,
                        overflow: 'hidden',
                        transition: 'all 0.3s ease'
                      }}
                      bodyStyle={{ padding: '20px'}}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 12 }}>
                            <Checkbox 
                              checked={todo.done}
                              onChange={() => toggleComplete(todo)}
                              style={{ marginRight: 12, marginTop: 4 }}
                            />
                            <div style={{ flex: 1 }}>
                              <Title 
                                level={5} 
                                style={{ 
                                  margin: 0,
                                  textDecoration: todo.done ? 'line-through' : 'none',
                                  color: todo.done ? '#bfbfbf' : '#262626'
                                }}
                              >
                                {todo.text || todo.title}
                              </Title>
                            </div>
                          </div>
                          
                          <div style={{ marginBottom: 16 }}>
                            <Tag 
                              icon={todo.done ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
                              color={todo.done ? 'success' : 'processing'}
                            >
                              {todo.done ? 'Completed' : 'Pending'}
                            </Tag>
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Space>
                            <Tooltip title="View Details">
                              <Button 
                                type="text" 
                                icon={<EyeOutlined />}
                                onClick={() => viewTodo(todo)}
                              />
                            </Tooltip>
                            <Tooltip title="Edit">
                              <Button 
                                type="text" 
                                icon={<EditOutlined />}
                                onClick={() => showModal(todo)}
                              />
                            </Tooltip>
                          </Space>
                          <Popconfirm
                            title="Are you sure to delete this todo?"
                            onConfirm={() => handleDeleteTodo(todo.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Tooltip title="Delete">
                              <Button 
                                type="text" 
                                danger
                                icon={<DeleteOutlined />}
                              />
                            </Tooltip>
                          </Popconfirm>
                        </div>
                      </div>
                    </Card>
                  </List.Item>
                </motion.div>
              )}
            />
          </motion.div>
        ) : null}
      </Spin>        <Modal
            title={editingTodo ? "Edit Todo" : "Add New Todo"}
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={600}
            style={{ top: 20 }}
        >
          <Form form={form} layout="vertical">
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please input the todo title!' }]}
            >
              <Input placeholder="Enter todo title..." />
            </Form.Item>

            <Form.Item
                label="Description"
                name="body"
            >
              <TextArea
                  rows={4}
                  placeholder="Enter todo description..."
              />
            </Form.Item>

            {editingTodo && (
                <Form.Item name="done" valuePropName="checked">
                  <Checkbox>Mark as completed</Checkbox>
                </Form.Item>
            )}
          </Form>
        </Modal>
      </div>
  );
};

export default TodoList;