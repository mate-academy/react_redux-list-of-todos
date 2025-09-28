export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: number;
  name: string;
  username?: string;
  email?: string;
}
