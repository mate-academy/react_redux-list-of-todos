import { Todo } from '../types/Todo';

export type SelectTodo = {
  type: 'TODO/SELECT'
  payload: Todo,
};

export type RemoveTodo = {
  type: 'TODO/REMOVE'
};

export type ChooseAction = SelectTodo | RemoveTodo;

export const selectReducer = (
  todo: Todo | null = null,
  action: ChooseAction,
) => {
  switch (action.type) {
    case 'TODO/SELECT':
      return action.payload;

    case 'TODO/REMOVE':
      return null;

    default:
      return todo;
  }
};

export const action = {
  select: (todo: Todo): SelectTodo => ({
    type: 'TODO/SELECT',
    payload: todo,
  }),

  remove: (): RemoveTodo => ({
    type: 'TODO/REMOVE',
  }),
};
