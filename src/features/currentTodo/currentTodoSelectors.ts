import { RootState } from '../../app/store';

export const selectCurrentTodo = (state: RootState) => state.currentTodo;
