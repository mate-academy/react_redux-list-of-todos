import { Todo } from '../types/todo.type';
import { User } from '../types/user.type';
import { RootState } from './types';

export const loadTodosSelector = (state: RootState): Todo[] => state.todos;

export const getSelectedUserIdSelector
  = (state: RootState): number => state.selectedUserId;

export const loadUserSelector
  = (state: RootState): User | null => state.user;
