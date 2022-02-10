// eslint-disable-next-line
/// <reference types="react-scripts" />

export type Todo = {
  id: number,
  userId: number,
  completed: boolean,
  title: string,
}; /* TODO: DESCRIBE */

export type User = {
  id: number,
  name: string,
  phone: string,
  email: string,
};

export type RootState = {
  todos: Todo[],
  error: boolean,
  user: User | null,
  selectedUserId: number,
};
