// eslint-disable-next-line
/// <reference types="react-scripts" />

export interface Todo {
  id: number,
  userId: number,
  title: string,
  completed: boolean
}

export interface User {
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string
}

export interface State {
  todos: Todo[],
  user: User | null
}
