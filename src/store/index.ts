import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './user';
import todosReducer from './todos';
import filterReducer from './filter';
import { FilterType } from '../types/FilterType';

const rootReducer = combineReducers({
  todosInfo: todosReducer,
  userInfo: userReducer,
  filter: filterReducer,
});

type RootState = ReturnType<typeof rootReducer>;

const filterTodosSelector = (state: RootState) => {
  const { todos } = state.todosInfo;
  const { filterType, appliedQuery } = state.filter;

  const lowerCasedQuery = appliedQuery.toLowerCase();

  return todos.filter(todo => {
    const checkQuery = todo.title.toLowerCase().includes(lowerCasedQuery);

    switch (filterType) {
      case FilterType.All:
        return checkQuery;
      case FilterType.Active:
        return checkQuery && !todo.completed;
      case FilterType.Completed:
        return checkQuery && todo.completed;
      default:
        return true;
    }
  });
};

export const selectors = {
  getUserInfo: (state: RootState) => state.userInfo,
  getTodosInfo: (state: RootState) => state.todosInfo,
  getFilter: (state: RootState) => state.filter,
  getFilteredTodos: filterTodosSelector,
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
