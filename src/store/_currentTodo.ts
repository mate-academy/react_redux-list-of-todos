import { Todo } from '../types/Todo';

type SetTodo = {
  type: 'todo/set',
  payload: Todo,
};

export type TodosAction = SetTodo;

export const selectedTodoReduser = (
  todo: Todo,
  action: TodosAction,
): Todo => {
  switch (action.type) {
    case 'todo/set':
      return action.payload;

    default:
      return todo;
  }
};

export const actions = {
  settodos: (todo: Todo): TodosAction => ({
    type: 'todo/set',
    payload: todo,
  }),
};
