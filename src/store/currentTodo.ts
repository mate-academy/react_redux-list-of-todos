import { Todo } from '../types/Todo';

type SetTodoAction = {
  type: 'SET_TODO',
  payload: Todo,
};

type UnsetTodoAction = {
  type: 'UNSET_TODO'
};

type Action = SetTodoAction | UnsetTodoAction;

export const actions = {
  setTodo: (todo: Todo): SetTodoAction => ({
    type: 'SET_TODO',
    payload: todo,
  }),
  unsetTodo: (): UnsetTodoAction => ({
    type: 'UNSET_TODO',
  }),
};

export const selectionTodoReducer = (
  state: null | Todo = null,
  action: Action,
): Todo | null => {
  switch (action.type) {
    case 'SET_TODO':
      return action.payload;
    case 'UNSET_TODO':
      return null;
    default:
      return state;
  }
};
