import { Todo } from '../types/Todo';

const loadTodos = (todos: Todo[]): LoadTodosAction => {
  return {
    type: 'LOAD_TODOS',
    payload: todos,
  };
};

type LoadTodosAction = {
  type: 'LOAD_TODOS',
  payload: Todo[],
};

export const actions = { loadTodos };

const initialState: Todo[] = [];

const todosReducer = (
  state = initialState,
  action: LoadTodosAction,
): Todo[] => {
  switch (action.type) {
    case 'LOAD_TODOS':
      return [...state, ...action.payload];

    default:
      return state;
  }
};

export default todosReducer;
