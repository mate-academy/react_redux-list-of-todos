import { Todo } from '../types/Todo';

type LoadAction = {
  type: 'add';
  payload: Todo[];
};

export const loadTodo = (todos: Todo[]): LoadAction => ({
  type: 'add',
  payload: todos,
});

type Action = LoadAction;

export const actions = { loadTodo };

// eslint-disable-next-line @typescript-eslint/default-param-last
const todosReducer = (state: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'add':
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export default todosReducer;
