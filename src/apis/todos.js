import request from '../utils/request';

export const todosApi = {
  getAllTodos: async () => {
    try {
      const todos = await request.get('/todos');
      return todos;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  getTodoById: async (id) => {
    try {
      const todo = await request.get(`/todos/${id}`);
      return todo;
    } catch (error) {
      console.error('Error fetching todo:', error);
      throw error;
    }
  },

  addTodo: async (todoData) => {
    try {
      const newTodo = await request.post('/todos', {
        text: todoData.title,
        done: false,
        ...todoData
      });
      return newTodo;
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  },

  updateTodo: async (id, todoData) => {
    try {
      const updatedTodo = await request.put(`/todos/${id}`, todoData);
      return updatedTodo;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  },

  deleteTodo: async (id) => {
    try {
      await request.delete(`/todos/${id}`);
      return id;
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }
};