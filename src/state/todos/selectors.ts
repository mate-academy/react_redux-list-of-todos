import { RootState } from '../../app/store';

export const selectCurrentTodo = (state: RootState) => state.currentTodo;
export const selectTodos = (state: RootState) => state.todos;
export const selectFilter = (state: RootState) => state.filter;
