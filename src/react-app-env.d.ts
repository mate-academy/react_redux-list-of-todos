/// <reference types="react-scripts" />

type Todo = {
  id: number,
  title: string,
  userId: number,
  completed: boolean,
};

type User = {
  id: number,
  name: string,
  phone: string,
  email: string,
};

type State = {
  todos: Todo[],
  user: User | null,
};

type Action = {
  type : string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any,
};
