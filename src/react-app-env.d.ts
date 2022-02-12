// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Todo {
  id: number,
  userId: number,
  completed: boolean,
  title: string,
  createdAt: string,
  updatedAt: string,
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

interface RootState {
  todos: Todo[],
  selectedUserId: 0,
}

interface Action {
  type: string,
  payload: any,
}
