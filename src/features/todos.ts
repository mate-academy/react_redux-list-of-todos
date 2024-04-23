/* eslint-disable @typescript-eslint/default-param-last */
import { Todo } from '../types/Todo';

export type LoadingTodos = {
  type: 'todos/LoadingTodos';
  payload: Todo[];
};

const loadingTodos = (todos: Todo[]): LoadingTodos => ({
  type: 'todos/LoadingTodos',
  payload: todos,
});

export const actions = { loadingTodos };

const todosReducer = (todos: Todo[] = [], action: LoadingTodos): Todo[] => {
  switch (action.type) {
    case 'todos/LoadingTodos':
      return [...todos, ...action.payload];

    default:
      return todos;
  }
};

export default todosReducer;
