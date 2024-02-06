import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET';
  payload: Todo[],
};

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodos };

const todosReducer = (
  state: Todo[] = [],
  action: SetTodosAction,
): Todo[] => {
  if (action.type === 'todos/SET') {
    return action.payload;
  }

  return state;
};

export default todosReducer;
