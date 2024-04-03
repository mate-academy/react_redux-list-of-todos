/* eslint-disable @typescript-eslint/default-param-last */
import { Todo } from '../types/Todo';

type AddTodosAction = { type: 'todos/SET'; payload: Todo[] };

const addTodos = (todos: Todo[]): AddTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

type Action = AddTodosAction;

export const actions = { addTodos };

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
