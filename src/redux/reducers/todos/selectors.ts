import { RootState } from '../../store';

export const selectedUser = (state: RootState) => (
  state.todosList.selectedUser
);

export const allTodos = (state: RootState) => state.todosList.todos;
