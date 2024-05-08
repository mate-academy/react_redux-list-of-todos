/* eslint-disable @typescript-eslint/default-param-last */
import { Todo } from '../types/Todo';

type SetTodosActions = {
  type: 'todos/SET';
  payload: Todo[];
};

type Action = SetTodosActions;

const setTodos = (todos: Todo[]): SetTodosActions => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodos };

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
