import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { loadingReducer } from './loading';
import { todoReducer } from './selectedTodo';
import { todosReducer } from './todos';

const rootReducer = combineReducers({
  loading: loadingReducer,
  todos: todosReducer,
  todo: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const selectors = {
  loading: (state: RootState) => state.loading,

  todos: (state: RootState) => state.todos,

  todo: (state: RootState) => state.todo,
};

export const store = createStore(rootReducer, applyMiddleware(thunk));
