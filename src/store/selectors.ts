import { RootState } from '../react-app-env';

export const getError = (state: RootState) => state.error;
export const getTodoSelector = (state: RootState) => state.todos;
export const getUserSelector = (state: RootState) => state.user;
export const getSelectedUserId = (state: RootState) => state.selectedUserId;
