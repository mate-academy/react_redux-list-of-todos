// eslint-disable-next-line
/// <reference types="react-scripts" />

export type Todo = {
  title: string,
  userId: number,
  completed: boolean,
  id: number,
};

export type State = {
  todos: Todo[],
  user: User | null,
  inputValue: string,
  selectValue: string,
};

export type Action = {
  type: string,
  payload: any,
};

export type User = {
  id: number,
  name: string,
  email: string,
  phone: number,
};
