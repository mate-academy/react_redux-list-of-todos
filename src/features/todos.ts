import { Todo } from '../types/Todo';

type TodosAllAction = {
  type: 'todos/ALL', payload: { todos: Todo[], query: string }
};

type TodosActiveAction = {
  type: 'todos/ACTIVE', payload: { todos: Todo[], query: string }
};

type TodosCompletedAction = {
  type: 'todos/COMPLETED', payload: { todos: Todo[], query: string }
};

type Actions = TodosAllAction
| TodosActiveAction
| TodosCompletedAction;

const all = (initialTodos: Todo[], initialQuery: string): TodosAllAction => ({
  type: 'todos/ALL',
  payload: { todos: initialTodos, query: initialQuery },
});

const active = (
  initialTodos: Todo[], initialQuery: string,
): TodosActiveAction => ({
  type: 'todos/ACTIVE',
  payload: { todos: initialTodos, query: initialQuery },
});

const completed = (
  initialTodos: Todo[], initialQuery: string,
): TodosCompletedAction => ({
  type: 'todos/COMPLETED',
  payload: { todos: initialTodos, query: initialQuery },
});

export const actions = { all, active, completed };

const todosFilter = (todos: Todo[], query: string): Todo[] => {
  if (query) {
    return todos.filter(todo => todo.title.toLowerCase(
    ).includes(query.toLowerCase()));
  }

  return todos;
};

const todosReducer = (filteredTodos: Todo[] = [], action: Actions): Todo[] => {
  const { todos = [], query } = action.payload || {};

  switch (action.type) {
    case 'todos/ALL':
      return todosFilter(todos, query);

    case 'todos/ACTIVE':
      return todosFilter(todos.filter(todo => !todo.completed), query);

    case 'todos/COMPLETED':
      return todosFilter(todos.filter(todo => todo.completed), query);

    default:
      return filteredTodos;
  }
};

export default todosReducer;
