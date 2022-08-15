import { Todo } from '../types/Todo';

type SetTodoAction = {
  type: 'SET_TODO',
  payload: Todo,
};

type ResetTodoAction = {
  type: 'RESET_TODO',
};

type SelectedTodoAction = (SetTodoAction | ResetTodoAction);

export const ModalTodoActions = {
  selectTodo: (payload: Todo):SetTodoAction => (
    { type: 'SET_TODO', payload }
  ),

  unselectTodo: ():ResetTodoAction => ({ type: 'RESET_TODO' }),
};

export const selectedTodoReducer = (
  selectedTodo: Todo | null = null,
  action: SelectedTodoAction,
) => {
  switch (action.type) {
    case 'SET_TODO':
      return action.payload;

    case 'RESET_TODO':
      return null;

    default:
      return selectedTodo;
  }
};
