// eslint-disable-next-line
/// <reference types="react-scripts" />

export type Todo = {
  id: number,
  title: string,
  userId: number,
  completed: boolean,
};

export type User = {
  id: number,
  name: string,
  phone: string,
  email: string,
};

export type State = {
  todos: Todo[]
  user: User | null
};

export type Action = {
  type: string,
  payload: any,
};
