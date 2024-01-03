import { Todo } from '../types/Todo';

export const actions = { /* put action creators here */
  all: (todos: Todo[], query: string): Action => (
    { type: 'todos/ALL', payload: { todos, query } }
  ),
  active: (todos: Todo[], query: string): Action => (
    { type: 'todos/ACTIVE', payload: { todos, query } }
  ),
  completed: (todos: Todo[], query: string): Action => (
    { type: 'todos/COMPLETED', payload: { todos, query } }
  ),
};

export type Status = 'todos/ALL' | 'todos/ACTIVE' | 'todos/COMPLETED';

type Action = {
  type: Status;
  payload: {
    todos: Todo[];
    query: string;
  };
};

const todosReducer = (
  todos: Todo[] = [],
  action: Action,
): Todo[] => {
  let newTodos: Todo[] = [];

  switch (action.type) {
    case 'todos/ACTIVE':
      newTodos = action.payload.todos.filter(todo => !todo.completed);
      break;
    case 'todos/COMPLETED':
      newTodos = action.payload.todos.filter(todo => todo.completed);
      break;
    case 'todos/ALL':
      newTodos = action.payload.todos;
      break;
    default:
      newTodos = todos;
      break;
  }

  if (action.payload && action.payload.query) {
    newTodos = newTodos.filter(todo => todo.title.toLowerCase()
      .includes(action.payload.query.toLowerCase()));
  }

  return newTodos;
};

export default todosReducer;
