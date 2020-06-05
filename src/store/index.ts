import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import loadingReducer from './loading';
import todosReducer from './todos';

// Action types - is just a constant. MUST have a unique value.
/*
const SET_QUERY = 'SET_QUERY';

export const setQuery = (query: string) => ({
  type: SET_QUERY,
  query,
});*/

const rootReducer = combineReducers({
  loading: loadingReducer,
  todos: todosReducer,
  // sort: sortReducer,
  // people: peopleReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const getLoading = (state: RootState) => state.loading.loading;
export const getLoaded = (state: RootState) => state.loading.loaded;
export const getError = (state: RootState) => state.loading.error;
export const getTodos = (state: RootState) => state.todos;

/*export const getQuery = (state: RootState) => state.query;

export const getVisibleTodos = (state: RootState) => {
  return state.todos
    .filter(todo => todo.title.includes(state.query))
    .sort((a, b) => {
      return a.title.localeCompare(b.title);
    })
    .slice(5, 10);
};*/

const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

store.subscribe(() => {
  localStorage.setItem('todos', JSON.stringify(store.getState()));
});

export default store;
