// eslint-disable-next-line
/// <reference types="react-scripts" />
type Todo = {
  id: number;
  userId: number;
  completed: boolean;
  title: string;
  createdAt: string;
  updatedAt: string;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  createdAt: string;
  updatedAt: string;
};
