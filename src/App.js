import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import { TodoProvider } from './contexts/TodoContext';
import DefaultLayout from './layouts/DefaultLayout';
import TodoListPage from './pages/TodoListPage';
import TodoDetailPage from './pages/TodoDetailPage';
import DonePage from './pages/DonePage';
import ErrorPage from './pages/ErrorPage';
import AboutUsPage from './pages/AboutUsPage';
import './App.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
        },
      }}
    >
      <TodoProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<DefaultLayout />}>
                <Route index element={<TodoListPage />} />
                <Route path="todo/:id" element={<TodoDetailPage />} />
                <Route path="done" element={<DonePage />} />
                <Route path="about" element={<AboutUsPage />} />
                <Route path="*" element={<ErrorPage />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </TodoProvider>
    </ConfigProvider>
  );
}

export default App;
