import { Todo } from '../types/Todo';
import { SetTodosAction, TodosAction } from '../types/Redux/Todos';

export const todosReducer = (
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
  setTodos: (todos: Todo[]):SetTodosAction => ({
    type: 'todos/set',
    payload: todos,
  }),
};
