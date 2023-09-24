/* eslint-disable no-console */
import { RootState } from './store';

export const getTodos = (store: RootState) => store.todos;
export const getTodo = (store: RootState) => store.currentTodo;
export const getFilter = (store: RootState) => store.filter;
