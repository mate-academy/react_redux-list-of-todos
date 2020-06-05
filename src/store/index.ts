import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createSelector } from 'reselect';

import loadingReducer from './loading';
import todosReducer from './todos';
import queryReducer from './query';
import sortReducer from './sort';
import paginationReducer from './pagination';
import { ASC, DESC } from '../constants/sortOrders';

const rootReducer = combineReducers({
  loading: loadingReducer,
  todos: todosReducer,
  query: queryReducer,
  sort: sortReducer,
  pagination: paginationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const getLoading = (state: RootState) => state.loading.loading;
export const getLoaded = (state: RootState) => state.loading.loaded;
export const getError = (state: RootState) => state.loading.error;
export const getQuery = (state: RootState) => state.query;

export const getTodos = (state: RootState) => state.todos;
export const getSortBy = (state: RootState) => state.sort.field;
const getSortOrder = (state: RootState) => state.sort.order;

export const getVisibleTodos = createSelector(
  getTodos,
  getQuery,
  getSortBy,
  getSortOrder,

  (
    todos: Todo[],
    query: string,
    sortField: keyof HeadersConfig,
    sortOrder: typeof ASC | typeof DESC,
  ) => {
    let callback: (a: Todo, b: Todo) => number = () => 0;

    switch (typeof todos[0][sortField]) {
      case 'string':
        callback = (a, b) => a[sortField].localeCompare(b[sortField]);
        break;
      case 'object':
        callback = (a, b) => a[sortField].name.localeCompare(b[sortField].name);
        break;
      default:
        callback = (a, b) => a[sortField] - b[sortField];
    }

    const visibleTodos = todos
      .filter(todo => todo.title.includes(query))
      .sort(callback)
      // .slice(0, 10);

    if (sortOrder === DESC) {
      visibleTodos.reverse();
    }

    return visibleTodos;
  },
);

const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

store.subscribe(() => {
  localStorage.setItem('todos', JSON.stringify(store.getState()));
});

export default store;
