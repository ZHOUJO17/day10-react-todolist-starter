import React, { useState, useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import './TodoList.css';

const TodoList = () => {
  const { todos, addTodo, toggleTodo, deleteTodo } = useContext(TodoContext);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue.trim());
      setInputValue('');
    }
  };

  function handleItemClick(id) {
    toggleTodo(id);
  }

  function handleDelete(id) {
    deleteTodo(id);
  }

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <p className="subtitle">Add the things you need to do today...</p>
      
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a new todo..."
          className="todo-input"
        />
        <button type="submit" className="add-button">add</button>
      </form>

      {todos.length === 0 ? (<></>) : (
        <div className="todo-list">
          {todos.map(({ text, done, id }) => (
            <div key={id} className="todo-item">
              <span
                className={`todo-text ${done ? 'completed' : ''}`}
                onClick={() => handleItemClick(id)}
              >
                {text}
              </span>
              <button
                className="delete-button"
                onClick={() => handleDelete(id)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;