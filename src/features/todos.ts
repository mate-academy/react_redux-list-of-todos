import { Todo } from '../types/Todo';

type SetTodos = { type: 'todos/SET', payload: Todo[] };

const loadTodos = (todos: Todo[]): SetTodos => (
  { type: 'todos/SET', payload: todos }
);

export const todosActions = { loadTodos };

type Action = SetTodos;

const todosReducer = (
  state: Todo[] = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return [...action.payload];
    default:
      return state;
  }
};

export default todosReducer;
