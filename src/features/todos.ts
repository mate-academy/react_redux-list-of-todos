/* eslint-disable max-len */
import { Todo } from '../types/Todo';

type LoadAction = { type: 'loadTodos', payload: Todo[] };

type Action = LoadAction;

export const actions = {
  loadTodos: (todos: Todo[]): LoadAction => ({ type: 'loadTodos', payload: todos }),
};

const todosReducer = (state: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'loadTodos': return action.payload;

    default: return state;
  }
};

export default todosReducer;
