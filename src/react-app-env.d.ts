// eslint-disable-next-line
/// <reference types="react-scripts" />

type Todo = {
  id: number,
  createdAt: string,
  updatedAt: string,
  userId: number,
  title: string,
  completed: boolean,
};

type State = {
  todos: Todo[],
  currentUserId: number,
  titleFilter: string,
  statusFilter: string,
  user: User | null,
  isError: boolean,
};

type Action = {
  type: string,
  payload: any,
};

type User = {
  id: number,
  createdAt: string,
  updatedAt: string,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
};
