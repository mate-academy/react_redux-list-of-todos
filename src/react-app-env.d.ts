// eslint-disable-next-line
/// <reference types="react-scripts" />

export interface Action {
  type: string,
  payload: any,
}

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

export type User = {
  id: number,
  createdAt: string,
  updatedAt: string,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
};
