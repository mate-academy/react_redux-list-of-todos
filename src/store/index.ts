import {
  createStore, AnyAction, applyMiddleware, Dispatch, Action,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';
// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const TODOS_LOADED = 'TODOS_LOADED';
const FINISH_LOADING = 'FINISH_LOADING';

// Action creators - a function returning an action object
export const startLoading = () => ({ type: START_LOADING });
export const retrieveTodos = (response : Todo[]) => ({
  type: TODOS_LOADED,
  payload: response,
  message: 'All load',
});
export const finishLoading = (message = 'No message') => ({
  type: FINISH_LOADING,
  message,
});

// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;
export const getingTodos = (state: RootState) => state.todos;

// Initial state
export type RootState = {
  loading: boolean;
  message: string;
  todos: Todo[];
};

const initialState: RootState = {
  loading: false,
  message: '',
  todos: [],
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true };
    case TODOS_LOADED:
      return { loading: true, todos: action.payload, message: action.message };

    case FINISH_LOADING:
      return {
        ...state,
        loading: false,
        message: action.message,
      };

    default:
      return state;
  }
};

export async function fetchTodos(dispatch: Dispatch<Action>) {
  const response = await getTodos();

  dispatch(retrieveTodos(response));
}

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware)), // allows you to use http://extension.remotedev.io/
);

export default store;
