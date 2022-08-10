import { ClearSelectedTodoAction, SelectedTodoAction, SetSelectedTodoAction }
  from '../types/Redux/SelectedTodo';
import { Todo } from '../types/Todo';

export const selectedTodoReducer = (
  selectedTodo: Todo | null = null,
  action: SelectedTodoAction,
) => {
  switch (action.type) {
    case 'todo/set':
      return action.payload;
    case 'todo/clear':
      return null;
    default:
      return selectedTodo;
  }
};

export const actions = {
  setSelectedTodo: (todo: Todo):SetSelectedTodoAction => ({
    type: 'todo/set',
    payload: todo,
  }),
  clearSelectedTodo: (): ClearSelectedTodoAction => ({
    type: 'todo/clear',
  }),
};
