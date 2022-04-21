/* eslint-disable max-len */
import { RootState } from './types';

// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;

export const loadTodosSelector = (state: RootState): Todo[] => state.todos;

export const getSelectedUserIdSelector = (state: RootState): number => state.selectedUserId;

export const loadAllUsersSelector = (state: RootState): User[] => state.allUsers;
