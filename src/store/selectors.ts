import { RootState } from './types';

export const todosSelector = (state: RootState) => state.todos;
export const selectedUserIdSelector = (state: RootState) => (
  state.selectedUserId
);
export const userSelector = (state: RootState) => state.user;
