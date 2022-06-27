import { RootState } from '../react-app-env';

export const getTodosSelector = (state: RootState) => state.todos;

export const getUserSelector = (state: RootState) => state.user;
