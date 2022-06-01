import { State, Todo } from '../types';

export const getTodosSelector = (state: State): Todo[] => state.todos;
export const getSelectedUserId = (state: State): number => state.selectedUserId;
