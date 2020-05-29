import { createStore, combineReducers } from 'redux';
import reverseReducer from './isReversed';
import loadedReducer from './loaded';
import loadingReducer from './loading';
import todosReducer from './todos';
import sortTypeReducer from './sortType';

export const isLoading = (state: RootState) => state.loading;
export const getTodos = (state: RootState) => state.todos;
export const getLoaded = (state: RootState) => state.loaded;
export const getSortType = (state: RootState) => state.sortType;
export const getReverseStatus = (state: RootState) => state.isReverse;

const rootReducer = combineReducers({
  loading: loadingReducer,
  loaded: loadedReducer,
  sortType: sortTypeReducer,
  isReverse: reverseReducer,
  todos: todosReducer,
});

const initialState: RootState = {
  loading: false,
  loaded: false,
  sortType: 'id',
  isReverse: false,
  todos: [],
};

const store = createStore(
  rootReducer, initialState
);

export default store;
