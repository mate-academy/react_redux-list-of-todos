export interface TODO {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
  createdAt: string,
  updatedAt: string,
}

export type TODOS = {
  todos: TODO[],
};

export type TODOType = {
  key: number,
  todo: TODO,
};

export type ERRORType = {
  message: string;
};

export type PropState = {
  todo: TODO,
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
  todos: TODO []|[];
  isErrorTODO: boolean;
  isErrorUser: boolean,
  errorText: string,
  userErrorText: string,
  query: string,
  sortBy: string;
  user: User | Record<string|number, never>;
  userId: number;
};
