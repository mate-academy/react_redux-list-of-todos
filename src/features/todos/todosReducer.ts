import { Reducer } from 'redux';

import { Todo } from '../../types/Todo';
import { SetTodosAction, TodosActions } from './types';

type TodosState = Todo[];

type TodosAction = SetTodosAction;

const initialState: Todo[] = [];

export const todosReducer: Reducer<TodosState, TodosAction> = (
  state = initialState,
  action,
): Todo[] => {
  switch (action.type) {
    case TodosActions.SET_TODOS:
      return action.payload;

    default:
      return state;
  }
};
