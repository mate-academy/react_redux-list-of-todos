import { RootState } from '../app/store';

export const selectTodos = (state: RootState) => state.todos;
export const selectCurrentTodo = (state: RootState) => state.currentTodo;
