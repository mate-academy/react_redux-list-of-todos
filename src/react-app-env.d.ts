// eslint-disable-next-line
/// <reference types="react-scripts" />

type Todo = {
  id: number,
  userId: number,
  completed: boolean,
  title: string,
  createdAt: string,
  updatedAt: string,
};

type User = {
  name: string,
  username: string,
  id: number,
  email: string,
  phone: string,
};
