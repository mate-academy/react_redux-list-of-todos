/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Todo } from '../types/Todo';

const ADD_TODOS = 'todos/ADD_TODOS';

export const addTodos = (todos: Todo[]) => ({
  type: ADD_TODOS,
  payload: todos,
});

export const actions = { addTodos };

const todosReducer = (state: Todo[] = [],
  action: {
    type: string;
    payload?: Todo[],
  }): Todo[] => {
  switch (action.type) {
    case ADD_TODOS:
      return [...state, ...(action.payload || [])].flat(1);
    default:
      return state;
  }
};

export default todosReducer;
