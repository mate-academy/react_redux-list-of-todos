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
