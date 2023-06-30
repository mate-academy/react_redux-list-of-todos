import { Todo } from '../types/Todo';

type SetTodos = { type: 'todos/SET_TODOS', payload: Todo[] };

const addTodos = (payload: Todo[]): SetTodos => ({
  type: 'todos/SET_TODOS', payload,
});

const initialState = {
  latestTodos: [],
};

const todosReducer = (state = initialState, actions: SetTodos) => {
  switch (actions.type) {
    case 'todos/SET_TODOS':
      return {
        ...state,
        latestTodos: [...state.latestTodos, ...actions.payload],
      };
    default:
      return state;
  }
};

export const actions = { addTodos };
export default todosReducer;
