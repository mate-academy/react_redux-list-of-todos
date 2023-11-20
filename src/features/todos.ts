import { Todo } from '../types/Todo';

type ActionSetTodos = { type: 'todos/SET', payload: Todo[] };

const setTodos = (todos: Todo[]): ActionSetTodos => {
  return {
    type: 'todos/SET',
    payload: todos,
  };
};

const todosReducer = (state: Todo[] = [], actions: ActionSetTodos): Todo[] => {
  switch (actions.type) {
    case 'todos/SET':
      return [...state, ...actions.payload];
    default:
      return state;
  }
};

export const actions = { setTodos };

export default todosReducer;
