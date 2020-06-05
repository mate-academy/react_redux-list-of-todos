import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createSelector } from 'reselect';

import loadingReducer from './loading';
import todosReducer from './todos';
import queryReducer from './query';

const rootReducer = combineReducers({
  loading: loadingReducer,
  todos: todosReducer,
  query: queryReducer,
  // sort: sortReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const getLoading = (state: RootState) => state.loading.loading;
export const getLoaded = (state: RootState) => state.loading.loaded;
export const getError = (state: RootState) => state.loading.error;
export const getQuery = (state: RootState) => state.query;

const getTodos = (state: RootState) => state.todos;

export const getVisibleTodos = createSelector(
  getTodos,
  getQuery,

  (todos: Todo[], query: string) => {
    /*let callback: (a: Todo, b: Todo) => number = () => 0;

    switch (typeof todos[0][sortField]) {
      case 'string':
        callback = (a, b) => a[sortField].localeCompare(b[sortField]);
        break;
      case 'object':
        callback = (a, b) => a[sortField].name.localeCompare(b[sortField].name);
        break;
      default:
        callback = (a, b) => a[sortField] - b[sortField];
    }*/

    const visibleTodos = todos
      .filter(todo => todo.title.includes(query))
      // .sort(callback);

    // if (sortOrder === DESC) {
    //   visiblePeople.reverse();
    // }

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
