import { Todo, User } from '../react-app-env';
import {
  ActionType, AddTodosAction, LoadUserByIdAction, SelectUserIdAction,
} from './types';

export const addTodosActionCreator = (payload: Todo[]): AddTodosAction => ({
  type: ActionType.AddTodos,
  payload,
});

export const selectUserIdAction = (payload: number): SelectUserIdAction => ({
  type: ActionType.SelectUserId,
  payload,
});

export const addUserAction = (payload: User): LoadUserByIdAction => ({
  type: ActionType.LoadUserById,
  payload,
});
