import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { loadingReducer } from './loading';
import { selectionTodoReducer } from './currentTodo';
import { todosReducer } from './todos';
import { filterReducer } from './filter';
import { FilterType } from '../types/FilterType';

const rootReducer = combineReducers({
  loadingReducer,
  selectionTodoReducer,
  todosReducer,
  filterReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export const selectors = {
  getLoading: (state: RootState) => state.loadingReducer,
  getTodo: (state: RootState) => state.selectionTodoReducer,
  getTodos: (state: RootState) => {
    const todos = state.todosReducer;
    const { query, status } = state.filterReducer;

    return todos.filter(todo => {
      const isQuery = todo.title.toLowerCase().includes(query.toLowerCase());

      switch (status) {
        case FilterType.ACTIVE:
          return isQuery && !todo.completed;
        case FilterType.COMPLETED:
          return isQuery && todo.completed;
        case FilterType.ALL:
          return isQuery;
        default:
          return true;
      }
    });
  },
  getFilter: (state: RootState) => state.filterReducer,
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);
