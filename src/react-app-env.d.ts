/// <reference types="react-scripts" />

export type Todo = {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  title: string;
  completed: boolean;
};

export type User = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};

export type RootState = {
  todos: Todo[],
  user: User | null,
};

// export type Action = {
//   type: string,
//   payload: any,
// };
