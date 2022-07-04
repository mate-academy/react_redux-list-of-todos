/// <reference types="react-scripts" />

type Todo = {
  id: number,
  createdAt: string,
  updatedAt: string,
  userId: number,
  title: string,
  completed: boolean,
};

type User = {
  id?: number,
  createdAt?: string,
  updatedAt?: string,
  name?: string,
  username?: string,
  email?: string,
  phone?: string,
  website?: string,
};

type RootState = {
  loading: boolean;
  message: string;
  todos: Todo[],
  user: User,
};

type Action = {
  type: string;
  payload: any,
};
