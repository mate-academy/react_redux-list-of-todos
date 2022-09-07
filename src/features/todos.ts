import type { RootState } from '../app/store';
import { Todo } from '../types/Todo';

type Action = {
  type: 'SET_TODOS' | 'REMOVE_TODOS'
  payload: Todo[],
};

type State = Todo[] | null;

const removeTodos = () => ({ type: 'REMOVE_TODOS' });

const setTodo = (todos: Todo[]) => ({
  type: 'SET_TODOS',
  payload: todos,
});

export const todosActions = { setTodo, removeTodos };

export const PREPARED_TODOS = (state: RootState) => {
  const { todos, filter } = state;
  const { query, status } = filter;

  if (todos) {
    let preparedTodos: Todo[] = [];

    switch (status) {
      case 'active':
        preparedTodos = todos.filter((todo:Todo) => !todo.completed);
        break;
      case 'completed':
        preparedTodos = todos.filter((todo:Todo) => todo.completed);
        break;
      default:
        preparedTodos = todos;
    }

    return preparedTodos.filter(todo => (
      todo.title.toLowerCase().includes(query)));
  }

  return [];
};

export const SELECTED_TODO = (state: RootState) => {
  const { todos, currentTodo } = state;

  if (todos) {
    return todos.find(todo => todo.id === currentTodo);
  }

  return undefined;
};

const todosReducer = (
  state: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case 'SET_TODOS':
      return action.payload;
    case 'REMOVE_TODOS':
      return null;
    default:
      return state;
  }
};

export default todosReducer;
