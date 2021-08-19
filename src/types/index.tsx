export interface Todo {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
}

export type Todos = {
  todos: Todo[],
};

export interface User {
  name?: string,
  username?: string,
  email?: string,
  phone?: string,
  website?: string,
}

export type RootState = {
  todos: Todo[];
  user: User | null;
  userId: number;
  isUserSelected: boolean,
  isUserError: boolean,
  searchQuery: string,
  filterStatus: string;
  loading: boolean;
};

export type Filter = Record<string, string>;
