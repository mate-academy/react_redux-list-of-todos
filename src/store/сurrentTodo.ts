import { Todo } from '../types/Todo';

type SelectedTodoAction = {
  type: 'todo/select',
  payload: Todo,
};

type ClearTodoAction = {
  type: 'todo/clear',
};

type CurrentTodoAction = SelectedTodoAction | ClearTodoAction;

export const selectedTodoReducer = (
  currentTodo: Todo | null = null,
  action: CurrentTodoAction,
) => {
  switch (action.type) {
    case 'todo/select':
      return action.payload;

    case 'todo/clear':
      return null;

    default:
      return currentTodo;
  }
};

export const todoActions = {
  todoSelect: (payload: Todo): SelectedTodoAction => ({
    type: 'todo/select',
    payload,
  }),

  todoClear: (): ClearTodoAction => ({
    type: 'todo/clear',
  }),
};
