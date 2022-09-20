import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { loadingReducer } from './loading';
import {
  currentTodoReducer,
} from './currentTodo';

const reducer = combineReducers({
  loading: loadingReducer,
  currentTodo: currentTodoReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);
