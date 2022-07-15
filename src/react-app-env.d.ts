/// <reference types="react-scripts" />

interface Todo {
  id: number,
  createdAt: string,
  updatedAt: string,
  userId: number,
  title: string,
  completed: boolean,
}

interface User {
  id: number,
  createdAt: string,
  updatedAt: string,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
}

interface State {
  todos: Todo[],
  user: User | null,
}

interface Action {
  type: string,
  payload: any,
}
