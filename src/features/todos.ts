/* eslint-disable no-console */
import { Todo } from '../types/Todo';

const LOAD = 'todos/load';

type LoadAction = {
  type: 'todos/load';
  payload: Todo[];
};

const loadTodos = (todos: Todo[]): LoadAction => ({
  type: 'todos/load',
  payload: todos,
});

type Action = LoadAction;

export const actions = {
  loadTodos,
};

const initialState: Todo[] = [];

const todosReducer = (todos = initialState, action: Action): Todo[] => {
  switch (action.type) {
    case LOAD:
      return action.payload;
    default:
      return todos;
  }
};

export default todosReducer;
