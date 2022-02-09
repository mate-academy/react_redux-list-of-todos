// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Todo {
  completed: boolean;
  createdAt: string;
  id: number;
  title: string;
  updatedAt: string;
  userId: number;
}

interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

interface RootState {
  selectedUserId: number;
  todos: Todo[];
  filterParameter: string;
  searchTitle: string;
  userError: string;
  user: User;
}
