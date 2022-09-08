import { RootState } from '../app/store';
import { StateTodos } from '../features/todos';
import { StateUser } from '../features/currentUser';
import { Todo } from '../types/Todo';
import { FilterTypes } from '../types/FilterTypes';
import { StateFilter } from '../features/filter';

const todosSelector = (state: RootState): StateTodos => state.todos;

const filterTodosSelector = (state: RootState): Todo[] => {
  const { todos } = state.todos;
  const { query, status } = state.filter;

  const filteredTodos = todos.filter(({ title, completed }) => {
    const filteringByTitle = title.toLowerCase().includes(
      query.toLowerCase(),
    );

    switch (status) {
      case FilterTypes.All:
        return filteringByTitle;

      case FilterTypes.Active:
        return filteringByTitle && !completed;

      case FilterTypes.Completed:
        return filteringByTitle && completed;

      default:
        return filteringByTitle;
    }
  });

  return filteredTodos;
};

const filterSelector = (state: RootState): StateFilter => state.filter;

const currentTodoSelector = (state: RootState): Todo | undefined => {
  const { todos } = state.todos;

  return todos.find(todo => todo.id === state.currentTodoId);
};

const currentUserSelector = (state: RootState): StateUser => (
  state.currentUser
);

export const SELECTORS = {
  todosSelector,
  filterSelector,
  filterTodosSelector,
  currentTodoSelector,
  currentUserSelector,
};
