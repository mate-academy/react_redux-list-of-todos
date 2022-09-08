import { RootState } from '../app/store';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';
import { CurrentTodoId } from './currentTodoId';

const todosSelector = (state: RootState): Todo[] => state.todos;
const filteredTodosSelector = (state: RootState): Todo[] => {
  const { todos, filter } = state;

  return todos.filter((todo) => {
    const isMatchQuery = todo
      .title
      .toLowerCase()
      .includes(filter.query.toLowerCase());

    switch (filter.status) {
      case 'all':
        return isMatchQuery;

      case 'active':
        return isMatchQuery && !todo.completed;

      case 'completed':
        return isMatchQuery && todo.completed;

      default:
        return true;
    }
  });
};

const filterQuerySelector = (state: RootState): string => state.filter.query;
const filterSatusSelector = (state: RootState): Status => state.filter.status;

const currentTodoIdSelector = (state: RootState): CurrentTodoId => (
  state.currentTodoId
);

const todoByIdSelector = (todoId: CurrentTodoId) => {
  return (state: RootState) => {
    return state.todos.find(todo => todo.id === todoId) as Todo;
  };
};

export const SELECTORS = {
  todos: todosSelector,
  filteredTodos: filteredTodosSelector,
  query: filterQuerySelector,
  status: filterSatusSelector,
  currentTodoId: currentTodoIdSelector,
  currentTodo: todoByIdSelector,
};
