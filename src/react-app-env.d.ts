// eslint-disable-next-line
/// <reference types="react-scripts" />

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {};
  phone: string;
  website: string;
  company: {};
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface Todos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User;
}
