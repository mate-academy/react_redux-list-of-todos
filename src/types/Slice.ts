import { Status } from './Status';
import { Todo } from './Todo';
import { User } from './User';

export interface UserState {
  user: User | null;
  loadingUser: boolean;
}

export interface TodosState {
  todos: Todo[];
  loadingTodos: boolean;
}

export interface FilterState {
  query: string;
  status: Status;
}
