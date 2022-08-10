// eslint-disable-next-line
/// <reference types="react-scripts" />
export type Status = 'all' | 'active' | 'completed';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}
