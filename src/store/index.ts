import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import todosReducer from './todos';
import currentTodoReducer, {
  actions as currentTodoActions,
} from './currentTodo';
import filterReducer from './filter';

import { getTodos } from '../api/todos';

export const selectors = {
  todos: (state: RootState) => (
    {
      loading: state.todos.loading,
      error: state.todos.error,
    }
  ),
  currentTodo: (state: RootState) => (
    {
      todo: state.currentTodo.todo,
      error: state.currentTodo.error,
      loading: state.currentTodo.loading,
    }
  ),
  filter: (state: RootState) => state.filter,
};

const rootReducer = combineReducers({
  todos: todosReducer,
  currentTodo: currentTodoReducer,
  filter: filterReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export const loadTodo = (todoId: number) => {
  return async (dispatch: typeof store.dispatch) => {
    try {
      const todos = await getTodos();

      const currentTodo = todos.find(todo => todo.id === todoId);

      if (currentTodo) {
        dispatch(currentTodoActions.setTodo(currentTodo));
      } else {
        dispatch(currentTodoActions.setError(true));
      }
    } catch {
      dispatch(currentTodoActions.setError(true));
    }
  };
};

export type RootState = ReturnType<typeof rootReducer>;
