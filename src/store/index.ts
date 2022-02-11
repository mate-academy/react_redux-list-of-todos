import { createStore, AnyAction } from 'redux';

export const SET_USER_ID = 'SET_USER_ID';
export const SET_USER = 'SET_USER';
export const SET_TODOS = 'SET_TODOS';

export type RootState = {
  selectedUserId: number;
  user: User | null;
  todos: Todo[];
};

export const initialState: RootState = {
  selectedUserId: 0,
  user: null,
  todos: [],
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_USER_ID:
      return { ...state, selectedUserId: action.payloud };

    case SET_USER:
      return { ...state, user: action.payloud };

    case SET_TODOS:
      return { ...state, todos: action.payloud };

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
);

export default store;
