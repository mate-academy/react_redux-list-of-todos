import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

function getPreparedTodos(todos: Todo[], filter: string | null | Status,
  query: string | null): Todo[] {
  const preparedTodos = todos.filter(todo => {
    switch (filter) {
      case 'completed':
        return todo.completed;

      case 'active':
        return !todo.completed;

      default:
        return true;
    }
  });

  if (query) {
    return preparedTodos.filter(
      todo => todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return preparedTodos;
}

type GetVisibleTodosAction = {
  type: 'todos/GET';
  payload: Filter,
};

type Filter = {
  query: string | null,
  status: string,
  todos: Todo [],
  isLoading: boolean,
};

type State = {
  todos: Todo[],
  isLoading: boolean,
};

const getVisibleTodos = (filter: Filter): GetVisibleTodosAction => ({
  type: 'todos/GET',
  payload: filter,
});

type Action = GetVisibleTodosAction;

export const actions = { getVisibleTodos };

const todosReducer = (
  state: State = { todos: [], isLoading: true },
  action: Action,
): State => {
  switch (action.type) {
    case 'todos/GET':
      return {
        todos: getPreparedTodos(
          action.payload.todos,
          action.payload.status,
          action.payload.query,
        ),
        isLoading: action.payload.isLoading,
      };
    default:
      return state;
  }
};

export default todosReducer;
