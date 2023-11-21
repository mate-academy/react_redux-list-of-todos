import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { queryReducer } from '../features/queryReducer';
import { todosReducer } from '../features/todos';
import { filterReducer } from '../features/filterReducer';
import { currentTodoReducer } from '../features/currentTodo';

const rootReducer = combineReducers({
  todo: currentTodoReducer,
  status: filterReducer,
  query: queryReducer,
  todos: todosReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
