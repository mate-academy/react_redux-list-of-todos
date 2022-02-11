// eslint-disable-next-line
/// <reference types="react-scripts" />

type Todo = {
  id: number;
  userId: number;
  completed: boolean;
  title: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

type State = {
  todos: Todo[];
  input: string;
  user: User | null;
  option: string;
};
