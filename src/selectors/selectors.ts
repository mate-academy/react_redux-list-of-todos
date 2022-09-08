import { RootState } from '../app/store';
import { StateFilter } from '../features/filter';
import { Maybe } from '../types/Maybe';
import { StateTodos } from '../features/todos';
import { StateUser } from '../features/currentUser';

const todosSelector = (state: RootState): StateTodos => state.todos;
const filterSelector = (state: RootState): StateFilter => state.filter;
const currentTodoIdSelector = (state: RootState): Maybe<number> => (
  state.currentTodoId
);
const currentUserSelector = (state: RootState): StateUser => (
  state.currentUser
);

export const SELECTORS = {
  todosSelector,
  filterSelector,
  currentTodoIdSelector,
  currentUserSelector,
};
