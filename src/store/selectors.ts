import { State } from '../react-app-env';

export const getTodosSelector = (state: State) => state.todos;

export const getUserSelector = (state: State) => state.user;
