import { Dispatch } from 'redux';
import { Todo } from '../types/Todo';
import { actions as loadingActions } from './loading';
import { getTodos } from '../api';

type Action = {
  type: 'SET_TODOS';
  payload: Todo[];
};

export const actions = {
  setTodos: (todos: Todo[]): Action => ({
    type: 'SET_TODOS',
    payload: todos,
  }),
  loadTodos: (dispatch: Dispatch) => {
    dispatch(loadingActions.startLoading());
    getTodos()
      .then(todosFromServer => dispatch(actions.setTodos(todosFromServer)))
      .finally(() => dispatch(loadingActions.finishLoading()));
  },
};

export const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'SET_TODOS':
      return action.payload;
    default:
      return todos;
  }
};
