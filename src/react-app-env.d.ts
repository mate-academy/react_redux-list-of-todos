// eslint-disable-next-line
/// <reference types="react-scripts" />

export interface Todo {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
}

export interface User {
  id: number,
  createdAt: string,
  updatedAt: string,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
}

export interface State {
  todos: Todo[],
  user: User | null,
}

export interface Action {
  type: string,
  payload?: any,
}
