import { State } from './types';

export const getTodosSelector = (state: State): Todo[] => state.todos;

export const getSelectedUserId = (state: State): number => state.selectedUserId;

export const getUserSelector = (state: State): User | null => state.user;
