import { Todo } from '../types/todo.type';
import { User } from '../types/user.type';
import { RootState } from './types';

export const loadTodosSelector = (state: RootState): Todo[] => state.todos;

export const getSelectedUserIdSelector
  = (state: RootState): number => state.selectedUserId;

export const loadAllUsersSelector
  = (state: RootState): User[] => state.allUsers;
