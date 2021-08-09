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
  isUserSelected: boolean,
  isUserError: boolean,
  searchQuery: string,
  filterStatus: string;
  loading: boolean;
};

export interface Filter {
  [key: string]: string;
}
