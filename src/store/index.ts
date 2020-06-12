import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import queryReducer from './query';
import loadingReducer from './loading';
import todosReducer from './todos';
import sortReducer from './sort';

// Selectors
export const getLoading = (state: RootState) => state.loading;
export const getTodos = (state: RootState) => state.todos;
export const getQuery = (state: RootState) => state.query;

type TodoComparator = (a: Todo, b: Todo) => number;

export const getVisibleTodos = (state: RootState) => {
  let compare: TodoComparator = () => 0;

  switch (state.sort.field) {
    case 'title':
      compare = (a: Todo, b: Todo) => a.title.localeCompare(b.title);
      break;
    case 'id':
      compare = (a: Todo, b: Todo) => a.id - b.id;
      break;
    case 'completed':
      compare = (a: Todo, b: Todo) => +a.completed - +b.completed;
      break;
    case 'user':
      compare = (a: Todo, b: Todo) => ((a.user && b.user)
        ? a.user.name.localeCompare(b.user.name)
        : 0);
      break;
    default:
  }

  const visibleTodos = state.todos.filter(todo => todo.title.includes(state.query))
    .sort(compare);

  if (state.sort.order === 'DESC') {
    visibleTodos.reverse();
  }

  return visibleTodos;
};

const rootReducer = combineReducers({
  loading: loadingReducer,
  todos: todosReducer,
  query: queryReducer,
  sort: sortReducer,

});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

export default store;
