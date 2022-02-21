// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

type RootState = {
  todos: Todo[];
  isUserLoading: boolean;
  user: User | null;
  hasUserLoadingError: boolean;
};
