import { Todo } from '../types/Todo';

type SetTodoAction = {
  type: 'todos/SET';
  payload: Todo[];
};

const setTodos = (todos: Todo[]): SetTodoAction => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodos };

const todosReducer = (
  state: Todo[] = [],
  action: SetTodoAction,
): Todo[] => {
  if (action.type === 'todos/SET') {
    return action.payload;
  }

  return state;
};

export default todosReducer;
