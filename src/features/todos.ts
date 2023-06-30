/* eslint-disable @typescript-eslint/no-shadow */
import { Todo } from '../types/Todo';

type SetTodosActions = { type: 'todos/SET', payload: Todo[] };

const setTodos = (todos: Todo[]): SetTodosActions => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodos };

type Actions = SetTodosActions;

const todosReducer = (
  state: Todo[] = [],
  actions: Actions,
): Todo[] => {
  switch (actions.type) {
    case 'todos/SET':
      return actions.payload;

    default:
      return state;
  }
};

export default todosReducer;
