/// <reference types="react-scripts" />

type User = {
  id: number,
  name: string,
  email: string,
  phone: string,
};

type Todo = {
  completed: boolean,
  createdAt: string,
  id: number
  title: string,
  updatedAt: string,
  userId: number
}; /* TODO: DESCRIBE */

interface Initial {
  reducerTodos: {
    todos: Todo[],
    todosToRender: Todo[],
    input: string,
    select: string,
    user: null | User,
    userId: 0
  }
}
