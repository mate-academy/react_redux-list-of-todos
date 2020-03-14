// eslint-disable-next-line
/// <reference types="react-scripts" />

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: object;
  phone: string;
  website: string;
  company: object;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TodoWithUsers extends Todo {
  user: User;
}

interface State {
  isLoading: boolean;
  todos: TodoWithUsers[];
}
