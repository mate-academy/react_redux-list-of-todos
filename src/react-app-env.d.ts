// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Todo {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
}

interface State {
  todos: Todo[],
  loading: boolean,
  error: null | string,
  userId: number,
}

interface User {
  id: number,
  name: string,
  email: string,
  phone: string,
}
