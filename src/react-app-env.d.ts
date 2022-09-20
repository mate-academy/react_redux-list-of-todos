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
  createdAt: string,
  email: string,
  id: number,
  name: string,
  phone: string,
  updatedAt: string,
  username: string,
  website: string,
};
