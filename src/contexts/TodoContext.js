import React, { createContext, useReducer, useContext, useCallback } from 'react';
import todoReducer, { initialState } from '../reducers/todoReducer';
import { todosApi } from '../apis/todos';

const TodoContext = createContext();

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const loadTodos = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      const todos = await todosApi.getAllTodos();
      dispatch({ type: 'SET_TODOS', payload: todos });
    } catch (error) {
      console.error('Failed to load todos:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Failed to load todos' });
      dispatch({ type: 'SET_TODOS', payload: [] });
    }
  }, []);

  const addTodo = useCallback(async (todoData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      const newTodo = await todosApi.addTodo(todoData);
      dispatch({ type: 'ADD_TODO', payload: newTodo });
    } catch (error) {
      console.error('Failed to add todo:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Failed to add todo' });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const updateTodo = useCallback(async (id, todoData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      const updatedTodo = await todosApi.updateTodo(id, todoData);
      dispatch({ type: 'UPDATE_TODO', payload: updatedTodo });
    } catch (error) {
      console.error('Failed to update todo:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Failed to update todo' });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const deleteTodo = useCallback(async (id) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      await todosApi.deleteTodo(id);
      dispatch({ type: 'DELETE_TODO', payload: id });
    } catch (error) {
      console.error('Failed to delete todo:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Failed to delete todo' });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const actions = {
    loadTodos,
    addTodo,
    updateTodo,
    deleteTodo
  };

  return (
    <TodoContext.Provider value={{ state, actions }}>
      {children}
    </TodoContext.Provider>
  );
};