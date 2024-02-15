import { Todo } from '../types/Todo';

const SET_TODOS = 'SetTodos';

type SetTodos = { type: typeof SET_TODOS, payload: Todo[] };

type State = Todo[];

export const loadTodos = (payload: Todo[]): SetTodos => ({
  type: SET_TODOS,
  payload,
});

type Action = SetTodos;

export const actions = { loadTodos };

const todosReducer = (state: State = [], action: Action) => {
  switch (action.type) {
    case SET_TODOS:
      return [...state, ...action.payload];

    default:
      return state;
  }
};

export default todosReducer;
