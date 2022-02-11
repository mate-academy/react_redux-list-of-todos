/// <reference types="react-scripts" />

type State = {
  todos: Todo[],
  user: User | null,
};

type Action = {
  type: string,
  payload: any,
};

type Todo = {
  userId: number,
  id: number,
  title: string,
  completed: boolean
};

type User = {
  id: number,
  name: string,
  email: string,
  phone: string,
};
