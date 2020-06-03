import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadReducer } from './loading';
import { todosReducer } from './todos';
import { sortTypeReducer } from './sort';
import { reverseReducer } from './reverse';
import { loadedReducer }  from './loaded';
import { errorReducer } from './errorMessage';


export const isLoading = (state: RootState) => state.loading;
export const getTodos = (state: RootState) => state.todos;
export const getErrorMessage = (state: RootState) => state.errorMessage;
export const getReverseValue = (state: RootState) => state.isReverse;
export const getSortType = (state: RootState) => state.sortType;
export const isLoaded = (state: RootState) => state.loaded;

export type RootState = {
  loading: boolean;
  loaded: boolean;
  sortType: string;
  isReverse: boolean;
  todos: Todo[],
  errorMessage: string,
};

const initialState: RootState = {
  loading: false,
  loaded: false,
  sortType: 'id',
  isReverse: false,
  todos: [],
  errorMessage: '',
};

const rootReducer =  combineReducers({
  loading: loadReducer,
  loaded: loadedReducer,
  todos: todosReducer,
  sortType: sortTypeReducer,
  isReverse: reverseReducer,
  errorMessage: errorReducer,
});

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(),
);

export default store;
