import { TodosState } from './store/types';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const loadTodosSelector = (state: TodosState): Todo[] => state.todos;

export const loadIdSelector = (
  state: TodosState,
): number => state.selectedId;

export const selectedUserSelector = (
  state: TodosState,
): User | null => state.selectedUser;
