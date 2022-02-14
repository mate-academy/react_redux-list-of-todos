// eslint-disable-next-line
/// <reference types="react-scripts" />

export type Todo = {
  id: number,
  title: string,
  userId: number,
  completed: boolean,
};

export type State = {
  todos: Todo[],
  visibleTodos: Todo[],
  user: User | null,
};

export type Action = {
  type: string,
  payload: any,
};

export type User = {
  id: number,
  name: string,
  email: string,
  phone: string,
};
