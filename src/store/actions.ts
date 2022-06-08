import {
  AddTodosAction, ActionsTypes,
  Todo, SetSelectedUserIdAction,
} from '../types';

export const addTodos = (payload: Todo[]): AddTodosAction => ({
  type: ActionsTypes.AddTodos,
  payload,
});

export const selectUserId
  = (payload: number): SetSelectedUserIdAction => ({
    type: ActionsTypes.SetSelectedUserId,
    payload,
  });

export const ACTIONS = {
  addTodos,
  selectUserId,
};
