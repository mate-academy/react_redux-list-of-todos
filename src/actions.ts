import {
  LoadTodos, SelectId, CurrentUser,
  ActionsType,
} from './store/types';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const setTodosActions = (payload: Todo[]): LoadTodos => ({
  type: ActionsType.LoadTodos,
  payload,
});

export const setIdAction = (num: number): SelectId => ({
  type: ActionsType.SelectId,
  payload: num,
});

export const setUserFromServe = (obj: User): CurrentUser => ({
  type: ActionsType.CurrentUser,
  payload: obj,
});
