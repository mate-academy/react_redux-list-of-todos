// eslint-disable-next-line
/// <reference types="react-scripts" />

export interface Todo {
  id: number
  userId: number
  completed: boolean
  title: string
}

export interface User {
  name: string;
  username: string;
  id: number;
  email: string;
  phone: string;
}
