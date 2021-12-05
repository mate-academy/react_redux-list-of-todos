import { createStore, AnyAction, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getCurrentUser, getTodos } from '../api';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
const FETCH_TODOS_FAILED = 'FETCH_TODOS_FAILED';
const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_FAILED = 'FETCH_USER_FAILED';

// Action creators - a function returning an action object
export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = (message = 'No message') => ({ type: FINISH_LOADING, message });

// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const todosData = (state: RootState) => state.todos;
export const userData = (state: RootState) => state.user;
export const getMessage = (state: RootState) => state.message;

export const fetchTodos = () => {
  return (dispatch: any) => {
    dispatch({ type: FETCH_TODOS_REQUEST });
    getTodos()
      .then(response => dispatch({ type: FETCH_TODOS_SUCCESS, data: response }))
      .catch(() => dispatch({ type: FETCH_TODOS_FAILED }));
  };
};

export const fetchUser = (id: number | undefined) => {
  return (dispatch: any) => {
    dispatch({ type: FETCH_USER_REQUEST });
    getCurrentUser(id)
      .then(response => dispatch({ type: FETCH_USER_SUCCESS, data: response }))
      .catch(() => dispatch({ type: FETCH_USER_FAILED }));
  };
};

// Initial state
export type RootState = {
  loading: boolean;
  todos: Todo[] | [];
  user: User | undefined;
  message: string;
};

const initialState: RootState = {
  loading: false,
  todos: [],
  user: undefined,
  message: '',
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.data,
      };

    case FETCH_TODOS_FAILED:
      return {
        ...state,
        error: true,
      };

    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.data,
      };

    case FETCH_USER_FAILED:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ), // allows you to use http://extension.remotedev.io/
);

export default store;
