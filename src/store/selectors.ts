import { State, Todo } from './types';

export const getTodoSelector = (state: State): Todo[] => state.todos;

export const getUserIdSelector = (state: State): number => state.selectedUserId;
