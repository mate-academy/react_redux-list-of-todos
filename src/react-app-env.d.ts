// eslint-disable-next-line
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
  inputValue: string,
  selectValue: string,
};

type Action = {
  type: string,
  payload: any,
};
