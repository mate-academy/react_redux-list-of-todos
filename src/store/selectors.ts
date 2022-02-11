import { RootState } from '.';

export const getSelectedUserId = (state: RootState) => state.selectedUserId;
export const getUser = (state: RootState) => state.user;
export const getTodos = (state: RootState) => state.todos;
