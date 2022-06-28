// eslint-disable-next-line
/// <reference types="react-scripts" />

type Todo = {
  completed: boolean,
  createdAt: string,
  id: number,
  title: string,
  updatedAt: string,
  userId: number,
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

export interface State {
  todos: Todo[],
  user: User | null,
}
