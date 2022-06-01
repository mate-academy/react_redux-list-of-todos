import { State } from './types';

export const getTodosSeletor = (state: State): Todo[] => state.todos;
export const selectedUserIdSelector = (state: State) => state.selectUserById;
export const removeUserIdSelector = (state: State) => state.removeTodoById;
export const getUserSelector = (state: State) => state.user;
