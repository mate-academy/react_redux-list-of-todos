import { Todo } from '../types/Todo';

type Todos = Todo[];

type AddTodos = {
  type: 'todos/ADD',
  payload: Todos,
};

const set = (payload: Todos): AddTodos => ({
  type: 'todos/ADD',
  payload,
});

export const actions = { set };

type Action = AddTodos;

const todosReducer = (
  todos: Todos = [],
  action: Action,
): Todos => {
  switch (action.type) {
    case 'todos/ADD':
      return [...action.payload];

    default:
      return todos;
  }
};

export default todosReducer;
