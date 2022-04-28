// eslint-disable-next-line
/// <reference types="react-scripts" />

type FilterEvent = React.ChangeEvent<HTMLInputElement>
| React.ChangeEvent<HTMLSelectElement>;

type Todo = {
  id: nuumber,
  createdAt: Date,
  updatedAt: Date,
  userId: number,
  title: string,
  completed: boolean,
};

type User = {
  id: number,
  createdAt: Date,
  updatedAt: Date,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
};

interface UserState {
  user: User | null,
  selectedUserId: number,
  isUserLoading: boolean,
  userLoadingError: boolean,
}

interface TodosState {
  todos: Todo[],
  isTodosLoading: boolean,
  todosLoadingError: boolean,
}
