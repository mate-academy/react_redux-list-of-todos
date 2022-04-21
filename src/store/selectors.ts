import { State } from './types';

export const getTodosSelector = (state: State): Todo[] => state.todos;

export const getUserSelector = (state: State): User | null => state.user;
