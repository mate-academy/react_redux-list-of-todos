/// <reference types="react-scripts" />

interface Todo {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  completed: boolean;
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

type State = {
  todos: Todo[];
  user: User | null;
  userId: number;
};

type Action = {
  type: string;
  payload: any;
};
