import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import currentTodoReducer, {
  Action as CurrentTodoAction,
} from '../features/currentTodo';
import filterReducer, { Action as FilterAction } from '../features/filter';
import todosReducer, { Action as TodosAction } from '../features/todos';

const rootReducer = combineReducers({
  currentTodo: currentTodoReducer,
  filter: filterReducer,
  todos: todosReducer,
});

// The `store` is passed to the Provider in `/src/index.tsx`
export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export type RootAction = CurrentTodoAction | FilterAction | TodosAction;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
