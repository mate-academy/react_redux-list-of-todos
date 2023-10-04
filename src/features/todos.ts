import { Todo } from '../types/Todo';

type AddTodos = { type: 'todos/SET', payload: Todos };

const set = (payload: Todos): AddTodos => ({ type: 'todos/SET', payload });

export const actions = { set };

type Todos = Todo[];
type Action = AddTodos;

const todosReducer = (
  todos: Todos = [],
  action: Action,
): Todos => {
  switch (action.type) {
    case 'todos/SET':
      return [...action.payload];

    default:
      return todos;
  }
};

export default todosReducer;
