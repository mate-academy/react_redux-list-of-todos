import { Todo } from '../types/Todo';

export type LoadingTodos = {
  type: 'todos/setTodos';
  payload: Todo[];
};

const setTodos = (todos: Todo[]): LoadingTodos => ({
  type: 'todos/setTodos',
  payload: todos,
});

export const actions = { setTodos };

const todosReducer = (state: Todo[] = [], action: LoadingTodos): Todo[] => {
  switch (action.type) {
    case 'todos/setTodos':
      return [...state, ...action.payload];

    default:
      return state;
  }
};

export default todosReducer;
