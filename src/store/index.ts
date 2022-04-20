import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Todo } from '../types/todo';
import { User } from '../types/user';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const LOAD_TODOS = 'LOAD_TODOS';
const SELECTED_USERID = 'SELECTED_USERID';
const SETUSER = 'SETUSER';

// Action creators - a function returning an action object
export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = (message = 'No message') => ({
  type: FINISH_LOADING,
  message,
});
export const loadTodos = (todos: Todo[]) => ({
  type: LOAD_TODOS,
  payload: todos,
});
export const setSelectedUserId = (id: number) => ({
  type: SELECTED_USERID,
  payload: id,
});

export const setUser = (user: User) => ({
  type: SETUSER,
  payload: user,
});

// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;
export const getTodos = (state: RootState) => state.todos;
export const getSelectedUserId = (state: RootState) => state.selectedUserId;
export const getUser = (state: RootState) => state.user;

// Initial state
export type RootState = {
  loading: boolean;
  message: string;
  todos: Todo[];
  selectedUserId: number;
  user: User | null;
};

const initialState: RootState = {
  loading: false,
  message: '',
  todos: [],
  selectedUserId: 0,
  user: null,
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };

    case FINISH_LOADING:
      return {
        ...state,
        loading: false,
        message: action.message,
      };

    case LOAD_TODOS:
      return {
        ...state,
        todos: [...state.todos, ...action.payload],
      };

    case SELECTED_USERID:
      return {
        ...state,
        selectedUserId: action.payload,
      };

    case SETUSER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  composeWithDevTools(), // allows you to use http://extension.remotedev.io/
);

export default store;
