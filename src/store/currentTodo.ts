import { Todo } from '../react-app-env';

type SelectTodoAction = {
  type: 'SELECT_TODO',
  playload: Todo,
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
      return action.playload;
    case 'UNSELECT_TODO':
      return null;
    default:
      return selectedTodo;
  }
};

export const actions = {
  selectTodo: (playload: Todo):SelectTodoAction => (
    { type: 'SELECT_TODO', playload }
  ),
  unselectTodo: ():UnSelectTodoAction => ({ type: 'UNSELECT_TODO' }),
};
