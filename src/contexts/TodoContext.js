import React, { createContext, useContext, useReducer } from 'react';
import todoReducer from '../reducers/todoReducer';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const addTodo = (text) => {
    dispatch({ type: 'ADD_TODO', payload: text });
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};