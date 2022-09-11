import { Todo } from '../types/Todo';

interface SetTodosAction {
  type: 'todos/set_todos';
  payload: Todo[];
}

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/set_todos',
  payload: todos,
});

export const todosActions = { setTodos };

const todosReducer = (
  todosState: Todo[] = [],
  action: SetTodosAction,
): Todo[] => {
  switch (action.type) {
    case 'todos/set_todos':
      return action.payload;

    default:
      return todosState;
  }
};

export default todosReducer;
