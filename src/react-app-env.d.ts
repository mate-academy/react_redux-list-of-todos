// eslint-disable-next-line
/// <reference types="react-scripts" />

export type Todo = {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
};

export type User = {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: number,
};
