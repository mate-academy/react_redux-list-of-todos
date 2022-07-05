// eslint-disable-next-line
/// <reference types="react-scripts" />

export interface Todo {
  id: number,
  title: string,
  userId: number,
  completed: boolean,
}

export interface User {
  id: number,
  name: string,
  phone: string,
  email: string,
}

export interface State {
  todos: Todo[],
  user: User | null,
}

export interface Action {
  type: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any,
}
