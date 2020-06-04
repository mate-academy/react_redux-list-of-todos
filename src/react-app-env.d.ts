// eslint-disable-next-line
/// <reference types="react-scripts" />
interface User {
  username: string;
  id: number;
}

interface Todo {
  title: string;
  id: number;
  userId: number;
  user?: User;
  completed: boolean;
}
