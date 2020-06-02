// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  user: User;
}

interface User {
  id: number;
  name: string;
}
