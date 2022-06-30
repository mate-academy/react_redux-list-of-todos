import { State } from './index';

export const getTodosSelector = (state: State) => state.todos;

export const getUserSelector = (state: State) => state.user;

export const getStatusSelector = (state: State) => state.status;

export const getFilterSelector = (state: State) => state.filter;
