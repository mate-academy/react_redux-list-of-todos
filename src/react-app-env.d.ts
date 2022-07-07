// eslint-disable-next-line
/// <reference types="react-scripts" />
interface Todo {
  id: number,
  completed: boolean,
  title: string,
  userId: number,
}

interface User {
  name: string,
  email: string,
  phone: string,
}

type RootState = {
  initTodos: Todo[],
  id: number,
  selectedId: number,
  valueFilter: string,
  valueSelect: string,
  randomize: boolean,
  user: User | null,
};
