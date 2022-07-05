import { createStore, AnyAction } from 'redux';

const TODOS = 'TODOS';
const CURRENT_USER = 'CURRENT_USER';

export const actions = {
  setTodos: (todos: Todo[]) => ({ type: TODOS, todos }),
  setUser: (user: User | null) => ({ type: CURRENT_USER, user }),
};

export const selectors = {
  getTodos: (state: RootState) => state.todos,
  getUser: (state: RootState) => state.user,
};

export type RootState = {
  todos: Todo[];
  user: User | null;
};

const initialState: RootState = {
  todos: [],
  user: null,
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case TODOS:
      return {
        ...state,
        todos: action.todos,
      };
    case CURRENT_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
