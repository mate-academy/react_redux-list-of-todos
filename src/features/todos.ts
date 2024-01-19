import { Todo } from '../types/Todo';

type Set = { type: 'todos/SET', payload: Todo[] };

const setTodos = (todos: Todo[]): Set => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodos };

const todosReducer = (
  state: Todo[] = [],
  action: Set,
): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
