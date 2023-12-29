import { Todo } from '../types/Todo';

type StoreTodosAction = { type: 'todos/STORE', payload: Todo[] };

const storeTodos = (todos: Todo[]): StoreTodosAction => ({
  type: 'todos/STORE',
  payload: todos,
});

export const actions = { storeTodos };

const todosReducer = (
  state: Todo[] = [],
  action: StoreTodosAction,
): Todo[] => {
  if (action.type === 'todos/STORE') {
    return action.payload;
  }

  return state;
};

export default todosReducer;
