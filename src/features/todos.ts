/* eslint-disable max-len */
import { Todo } from '../types/Todo';

type LoadAction = { type: 'todos/LOAD', payload: Todo[] };

type Action = LoadAction;

const loadTodos = (todos: Todo[]): LoadAction => ({ type: 'todos/LOAD', payload: todos });

export const actions = { loadTodos };

const todosReducer = (state: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/LOAD': return action.payload;

    default: return state;
  }
};

export default todosReducer;
