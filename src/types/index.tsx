export interface Todo {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
  createdAt: string,
  updatedAt: string,
}

export type Todos = {
  todos: Todo[],
};

export interface User {
  id?: number,
  name?: string,
  username?: string,
  email?: string,
  phone?: string,
  website?: string,
  createdAt?: string,
  updatedAt?: string,
}

export type RootState = {
  todos: Todo []|[];
  user: User | Record<string|number, never>;
  userId: number;
  isErrorTodo: boolean;
  isErrorUser: boolean,
  errorText: string,
  userErrorText: string,
  searchQuery: string,
  filterStatus: string;
  // todosStatusChanged: boolean;
  loading: boolean;
  message: string;
};

export interface Filter {
  [key: string]: string;
}
