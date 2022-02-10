// eslint-disable-next-line
/// <reference types="react-scripts" />

export type Todo = {
  id: number,
  userId: number,
  completed: boolean,
  title: string,
};

export type User = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

export type State = {
  todos: Todo[],
  user: User | null,
};

type Action = {
  type: string,
  payload: any,
};
