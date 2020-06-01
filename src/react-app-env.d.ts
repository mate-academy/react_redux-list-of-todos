// eslint-disable-next-line
/// <reference types="react-scripts" />

type RootState = {
  todos: Todo[];
  id?: number;
  isLoading: boolean;
  isLoaded: boolean;
  sortType: string;
};

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User;
}

interface User {
  id: number;
  name: string;
}

interface Todos {
  todos: Todo[];
}

type LoadButtonProps = {
  loadTodos: () => void;
};

type ButtonProps = {
  title: string;
  sortType: string;
};
