import { Todo } from '../react-app-env';

type SetTodosAction = {
  type: 'setTodos',
  playload: Todo [],
};

type TodosAction = SetTodosAction;

export const todosReducer = (
  todos: Todo[] = [],
  action: TodosAction,
): Todo [] => {
  switch (action.type) {
    case 'setTodos':
      return action.playload;

    default:
      return todos;
  }
};

export const actions = {
  setTodos: (todos: Todo []): SetTodosAction => ({
    type: 'setTodos',
    playload: todos,
  }),
};
