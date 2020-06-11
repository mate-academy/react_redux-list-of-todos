import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Action types - is just a constant. MUST have a unique value.
const LOAD_TODOS = 'LOAD_TODOS';
const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const SORT_BY = 'SORT_BY';
const SET_SORTED_TODOS = 'SET_SORTED_TODOS';

// Action creators - a function returning an action object
export const loadTodos = ((todos: Todo[]) => ({ type: LOAD_TODOS, todos }));
export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = (message = '') => ({ type: FINISH_LOADING, message });
export const setSortBy = (sortBy = '') => ({ type: SORT_BY, sortBy });
export const setSortedTodos = (visibleTodos: Todo[]) => ({ type: SET_SORTED_TODOS, visibleTodos });

// Selectors - a function receiving Redux state and returning some data from it
export const getLoadedTodos = (state: RootState) => state.todos;
export const isLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;
export const getSortBy = (state: RootState) => state.sortBy;

// Initial state
export type RootState = {
  todos: Todo[];
  loading: boolean;
  message: string;
  sortBy: string;
};

const initialState: RootState = {
  todos: [],
  loading: false,
  message: '',
  sortBy: '',
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOAD_TODOS:
      return {
        ...state,
        todos: action.todos,
      };
    case SET_SORTED_TODOS:
      return {
        ...state,
        todos: action.visibleTodos,
      };
    case START_LOADING:
      return { ...state, loading: true };

    case FINISH_LOADING:
      return {
        ...state,
        loading: false,
        message: action.message,
      };

    case SORT_BY:
      return {
        ...state,
        sortBy: action.sortBy,
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
