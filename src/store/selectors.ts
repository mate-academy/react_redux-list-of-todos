import { Todo } from '../react-app-env';
import { State } from './types';

export const getTodosSelector = (state: State): Todo[] => state.todos;
export const selectUserIdSelector = (state: State) => state.selectUserId;
export const getUserSelector = (state: State) => state.user;
