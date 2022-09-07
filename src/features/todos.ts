import { Todo } from '../types/Todo';

type GetTodos = { type: 'Todos/SET', payload: Todo[] };

const setTodos = (todos: Todo[]): GetTodos => (
  { type: 'Todos/SET', payload: todos }
);

export const actions = { setTodos };

type Action = GetTodos;

const todosReducer = (
  state: Todo[] = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'Todos/SET':
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
