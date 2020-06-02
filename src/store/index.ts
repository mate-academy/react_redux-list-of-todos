import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import todosReducer from './todos';
import loadingReducer from './loading';
import sortReducer from './sort';

export const todosList = (state: RootState) => state.todosList;
export const isLoading = (state: RootState) => state.loading.isLoading;
export const isVisible = (state: RootState) => state.loading.isVisible;

export const getSortField = (state: RootState) => state.sort.field;
export const getSortOrder = (state: RootState) => state.sort.order;

export const getSortedTodos = (state: RootState) => {
  const visibleTodos = [...state.todosList];
  const { order, field } = state.sort;

  switch (field) {
    case 'user':
    case 'title':
      if (order === 'ASC') {
        visibleTodos
          .sort((a, b) => a[field].localeCompare(b[field]));
      } else {
        visibleTodos
          .sort((a, b) => b[field].localeCompare(a[field]));
      }

      break;
    case 'completed':
      if (order === 'ASC') {
        visibleTodos
          .sort((a, b) => (+a.completed - +b.completed));
      } else {
        visibleTodos
          .sort((a, b) => (+b.completed - +a.completed));
      }

      break;
    default:
  }

  return visibleTodos;
};

type RootState = {
  todosList: Todo[];
  loading: {
    isLoading: boolean;
    isVisible: boolean;
  };
  sort: {
    field: string;
    order: 'ASC' | 'DESC' ;
  };
};

const rootReducer = combineReducers(
  {
    todosList: todosReducer,
    loading: loadingReducer,
    sort: sortReducer,
  },
);

const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

export default store;
