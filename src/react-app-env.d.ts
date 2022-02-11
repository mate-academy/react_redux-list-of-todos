// eslint-disable-next-line
/// <reference types="react-scripts" />

import { TodoStatus } from './types/TodoStatus';

type Todo = {
  id: number,
  userId: number,
  completed: boolean,
  title: string,
};

type User = {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
};

type Filter = {
  query: string,
  status: TodoStatus,
};

type State = {
  todos: Todo[],
  user: User,
  filter: Filter,
};
