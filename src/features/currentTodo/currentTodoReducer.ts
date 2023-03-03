import { Reducer } from 'redux';

import { Todo } from '../../types/Todo';
import { RemoveTodoAction, SetTodoAction, TodoActions } from './types';

type CurrentTodoState = Todo | null;
type CurrentTodoAction = SetTodoAction | RemoveTodoAction;
type CurrentTodoReducer = Reducer<CurrentTodoState, CurrentTodoAction>;

export const currentTodoReducer: CurrentTodoReducer = (
  state = null,
  action,
) => {
  switch (action.type) {
    case TodoActions.SET_ITEM:
      return action.payload;

    case TodoActions.REMOVE_ITEM:
      return null;

    default:
      return state;
  }
};
