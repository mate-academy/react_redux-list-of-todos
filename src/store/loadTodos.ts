import { Todo } from '../types/Todo';

type SetTodos = {
  type: 'todos/set',
  payload: Todo[],
};

export type TodosAction = SetTodos;

export const todosReduser = (
  todos: Todo[] = [],
  action: TodosAction,
): Todo[] => {
  switch (action.type) {
    case 'todos/set':
      return action.payload;

    default:
      return todos;
  }
};

export const actions = {
  settodos: (todos: Todo[]): TodosAction => ({
    type: 'todos/set',
    payload: todos,
  }),
};
