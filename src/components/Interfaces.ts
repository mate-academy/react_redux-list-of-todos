export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  userName?: string;
}

export interface User {
  id: number;
  name: string;
}
