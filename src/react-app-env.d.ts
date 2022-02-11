// eslint-disable-next-line
/// <reference types="react-scripts" />

type Todo = {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
};

type State = {
  todos: Todo[],
  user: User | null,
};

type Actions = {
  type: string,
  payload: any,
};

type User = {
  id: number,
  name: string,
  email: string,
  phone: string,
};
