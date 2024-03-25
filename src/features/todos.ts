/* eslint-disable @typescript-eslint/default-param-last */
import { Todo } from '../types/Todo';

type AddTodosAction = { type: 'add'; payload: Todo[] };

const addTodos = (todos: Todo[]): AddTodosAction => ({
  type: 'add',
  payload: todos,
});

type Action = AddTodosAction;

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'add':
      return [...todos, ...action.payload];
    default:
      return todos;
  }
};

const actions = { addTodos };

export { todosReducer, actions };
