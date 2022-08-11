import { Todo } from '../types/Todo';

export type SetTodosAction = {
  type: 'TODOS/SET',
  payload: Todo[],
};

export type TodosAction = SetTodosAction;

export const todosReducer = (
  todos: Todo[] = [],
  action: TodosAction,
) => {
  switch (action.type) {
    case 'TODOS/SET':
      return action.payload;
    default:
      return todos;
  }
};

export const actions = {
  set: (todos: Todo[]): SetTodosAction => ({
    type: 'TODOS/SET',
    payload: todos,
  }),
};
