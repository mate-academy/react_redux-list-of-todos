// eslint-disable-next-line
/// <reference types="react-scripts" />
export type RootState = {
  todos: Todo[];
  user: User | null;
};

export type Todo = {
  id: number;
  userId: number;
  completed: boolean;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  createdAt: string;
  updatedAt: string;
};
