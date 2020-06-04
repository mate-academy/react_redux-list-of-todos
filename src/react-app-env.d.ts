// eslint-disable-next-line
/// <reference types="react-scripts" />
interface User {
  id: number;
  name: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
}

type RootState = {
  todos: Todo[];
  id?: number;
  isLoading: boolean;
  isLoaded: boolean;
  sortType: string;
  isReverse: boolean;
};
