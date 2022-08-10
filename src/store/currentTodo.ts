import { Todo } from '../types/Todo';

type SelectTodoAction = {
  type: 'SELECT_TODO',
  payload: Todo,
};

type UnSelectTodoAction = {
  type: 'UNSELECT_TODO',
};

type SelectedTodoAction = (SelectTodoAction | UnSelectTodoAction);

export const selectedTodoReducer = (
  selectedTodo: Todo | null = null,
  action: SelectedTodoAction,
) => {
  switch (action.type) {
    case 'SELECT_TODO':
      return action.payload;

    case 'UNSELECT_TODO':
      return null;

    default:
      return selectedTodo;
  }
};

export const actions = {
  selectTodo: (payload: Todo):SelectTodoAction => (
    { type: 'SELECT_TODO', payload }
  ),

  unselectTodo: ():UnSelectTodoAction => ({ type: 'UNSELECT_TODO' }),
};
