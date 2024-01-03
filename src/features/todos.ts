import { Todo } from '../types/Todo';

type LoadAction = { type: 'load', payload: Todo[] };
const loadTodos = (todos: Todo[]): LoadAction => ({
  type: 'load',
  payload: todos,
});

export const actions = { loadTodos };

const todosReducer = (
  state: Todo[] = [],
  action: LoadAction,
): Todo[] => {
  switch (action.type) {
    case 'load':
      return [...state, ...action.payload];

    default:
      return state;
  }
};

export default todosReducer;
