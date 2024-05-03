import { Todo } from '../types/Todo';

type LoadingTodos = {
  type: 'todos/setTodos';
  payload: Todo[];
};

const load = (todos: Todo[]): LoadingTodos => ({
  type: 'todos/setTodos',
  payload: todos,
});

export const actions = { load };

// eslint-disable-next-line
const todosReducer = (state: Todo[] = [], action: LoadingTodos): Todo[] => {
  switch (action.type) {
    case 'todos/setTodos':
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
