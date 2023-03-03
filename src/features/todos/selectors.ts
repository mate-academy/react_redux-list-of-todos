import { RootState } from '../../app/store';

export const getTodosFromStore = (state: RootState) => {
  return state.todos;
};
