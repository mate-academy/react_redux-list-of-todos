import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import filterReducer from '../features/filter';
import todosReducer from '../features/todos';
import currentTodoReducer from '../features/currentTodo';

const rootReducer = combineReducers({
  filter: filterReducer,
  todos: todosReducer,
  currentTodo: currentTodoReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
