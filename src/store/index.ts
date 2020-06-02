import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import todosReducer from './todos';
import loadingReducer from './loading';
import sortReducer from './sort';

// Selectors - a function receiving Redux state and returning some data from it
export const todosList = (state: RootState) => state.todosList;
export const isLoading = (state: RootState) => state.loading.isLoading;
export const isVisible = (state: RootState) => state.loading.isVisible;

export const field = (state: RootState) => state.sort.field;
export const order = (state: RootState) => state.sort.order;

type RootState = {
  todosList: Todo[];
  loading: {
    isLoading: boolean;
    isVisible: boolean;
  };
  sort: {
    field: string;
    order: 'ASK' | 'DESK' ;
  };
};

// rootReducer - this function is called after dispatching an action
const rootReducer = combineReducers(
  {
    todosList: todosReducer,
    loading: loadingReducer,
    sort: sortReducer,
  },
);


// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  composeWithDevTools(), // allows you to use http://extension.remotedev.io/
);

export default store;
