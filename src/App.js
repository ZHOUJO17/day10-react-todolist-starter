import React from 'react';
import { TodoProvider } from './contexts/TodoContext';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <TodoProvider>
      <div className="App">
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;
