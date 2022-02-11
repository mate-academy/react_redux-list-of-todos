// eslint-disable-next-line
/// <reference types="react-scripts" />

type Todo = {
  id: number,
  userId: number,
  title: string,
  createdAt: string,
  updatedAt: string,
  completed: boolean,
};

type User = {
  id: number,
  name: string,
  email: string,
  phone: string,
};

export type State = {
  todos: Todo[]
  user: User | null
};

export type Action = {
  type: string,
  payload: any,
};
