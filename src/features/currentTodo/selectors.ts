import { RootState } from '../../app/store';

export const getCurrentTodo = (state: RootState) => {
  return state.currentTodo;
};

export const getCurrentTodoId = (state: RootState) => {
  return state.currentTodo?.id || 0;
};
