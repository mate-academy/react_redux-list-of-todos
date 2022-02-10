import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const SET_TODOS = 'SET_TODOS';
const SET_USER_ID = 'SET_USER_ID';
const INVERT_USER_LOADER_VISIBILITY = 'SET_USER_LOADER_VISIBILITY';
const SET_USER = 'SET_USER';

export const setTodos = (todosFromServer: Todo[]) => (
  { type: SET_TODOS, payload: todosFromServer }
);

export const setSelectedUserId = (userId: number) => (
  { type: SET_USER_ID, payload: userId }
);

export const invertUserLoaderVisibility = () => (
  { type: INVERT_USER_LOADER_VISIBILITY }
);

export const setUser = (user: User | null) => (
  { type: SET_USER, payload: user }
);

export const getTodos = (state: RootState) => state.todos;
export const getSelectedUserId = (state: RootState) => state.selectedUserId;
export const getIsUserLoading = (state: RootState) => state.isUserLoading;
export const getUser = (state: RootState) => state.user;

export type RootState = {
  selectedUserId: number;
  todos: Todo[];
  isUserLoading: boolean;
  user: User | null;
};

const initialState: RootState = {
  selectedUserId: 0,
  todos: [],
  isUserLoading: false,
  user: null,
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };

    case SET_USER_ID:
      return {
        ...state,
        selectedUserId: action.payload,
      };

    case INVERT_USER_LOADER_VISIBILITY:
      return {
        ...state,
        isUserLoading: !state.isUserLoading,
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

export default store;
