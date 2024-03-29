/* eslint-disable @typescript-eslint/default-param-last */

import { Todo } from '../types/Todo';

type Todos = {
  type: 'todos/ADD';
  payload: Todo[];
};

const setTodos = (todos: Todo[]): Todos => ({
  type: 'todos/ADD',
  payload: todos,
});

export const actions = { setTodos };

const todosReducer = (todos: Todo[] = [], action: Todos): Todo[] => {
  switch (action.type) {
    case 'todos/ADD':
      return [...todos, ...action.payload];
    default:
      return todos;
  }
};

export default todosReducer;
