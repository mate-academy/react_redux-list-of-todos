import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET',
  payload: Todo[],
};

export type TodosAction = SetTodosAction;

export const todosReducer = (
  todos: Todo[] = [],
  action: TodosAction,
): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return todos;
  }
};

export const actions = {
  setTodos: (todos: Todo[]): SetTodosAction => ({
    type: 'todos/SET',
    payload: todos,
  }),
};
