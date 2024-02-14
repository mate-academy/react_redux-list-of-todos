import { RootState } from '../app/store';

export const currentTodoSelector = (state: RootState) => state.currentTodo;

export const todosSelector = (state: RootState) => state.todos;

export const filterSelector = (state: RootState) => state.filter;
