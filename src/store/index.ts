import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import loadingReducer from './loading';
import loadedReducer from './loaded';
import sortTypeReducer from './sortType';
import todosReducer from './todos';
import errorMessageReducer from './errorMessage';


// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const isLoaded = (state: RootState) => state.loaded;
export const getSortType = (state: RootState) => state.sortType;
export const getTodos = (state: RootState) => state.todos;
export const getErrorMessage = (state: RootState) => state.errorMessage;


const initialState: RootState = {
  loading: false,
  loaded: false,
  sortType: '',
  todos: [],
  errorMessage: '',
};


// rootReducer - this function is called after dispatching an action

const rootReducer = combineReducers({
  loading: loadingReducer,
  loaded: loadedReducer,
  sortType: sortTypeReducer,
  todos: todosReducer,
  errorMessage: errorMessageReducer,
});

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(), // allows you to use http://extension.remotedev.io/
);

export default store;
