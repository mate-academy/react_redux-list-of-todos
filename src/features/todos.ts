import { Todo } from '../types/Todo';

type GetTodos = { type: 'todos/GetAll', payload: Todo[] };

const setTodos = (todos: Todo[]): GetTodos => (
  { type: 'todos/GetAll', payload: todos }
);

export const actions = { getTodos: setTodos };

type Action = GetTodos;

const todosReducer = (
  todos: Todo[] = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/GetAll':
      return [...todos, ...action.payload];

    default:
      return todos;
  }
};

export default todosReducer;
