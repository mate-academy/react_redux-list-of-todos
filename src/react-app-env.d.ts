/// <reference types="react-scripts" />

export interface Todo {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
}

export interface State {
  todos: Todo[],
  user: User | null,
}

export interface Action {
  type: string,
  payload: any,
}

export interface User {
  id: number,
  name: string,
  userName: string,
  email: string,
  phone: string,
  website: string,
}
