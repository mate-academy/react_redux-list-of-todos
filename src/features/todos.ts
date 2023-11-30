import { Todo } from '../types/Todo';

type AddTodos = { type: 'todos/SET', payload: Todos };

type Todos = Todo[];

const set = (value: Todos): AddTodos => ({
  type: 'todos/SET',
  payload: value,
});

export const actions = { set };

type Action = AddTodos;

const todosReducer = (todos: Todos = [], action: Action): Todos => {
  switch (action.type) {
    case 'todos/SET':
      return [...action.payload];
    default:
      return todos;
  }
};

export default todosReducer;
