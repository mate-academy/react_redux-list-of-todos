// eslint-disable-next-line
/// <reference types="react-scripts" />
export type RootState = {
  loading: boolean;
  message: string;
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

export type Action = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
};
