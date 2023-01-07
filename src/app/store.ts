import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// eslint-disable-next-line import/no-cycle
import currentTodoReducer from '../features/currentTodo';
// eslint-disable-next-line import/no-cycle
import filterReducer from '../features/filter';
// eslint-disable-next-line import/no-cycle
import todosReducer from '../features/todos';

export enum TodosActions {
  Set = 'todos/SET',
}

export enum FilterActions {
  SetQuery = 'filter/SET_QUERY',
  SetStatus = 'filter/SET_STATUS',
}

export enum TodoActions {
  Remove = 'currentTodo/REMOVE',
  Set = 'currentTodo/SET',
}

const rootReducer = combineReducers({
  currentTodo: currentTodoReducer,
  filter: filterReducer,
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
