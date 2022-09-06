import {
  createStore, applyMiddleware, combineReducers, Action as BasicAction,
} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import { Todo } from '../types/Todo';

import { LoadingActions, loadingReducer } from './loading';
import {
  loadTodosAction, setTodosActionCreator, TodosActions, todosReducer,
} from './todos';
import { currentTodoIdReducer } from './currentTodoId';

export interface Action<T, P> extends BasicAction<T> {
  payload: P,
}

export type LoadTodos = LoadingActions | TodosActions;

export const TODOS_ACTIONS_CREATOR = {
  set: setTodosActionCreator,
  loadTodos: loadTodosAction,
};

export const rootReducer = combineReducers({
  loading: loadingReducer,
  currentTodoId: currentTodoIdReducer,
  todos: todosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const loadingSelector = (state: RootState): boolean => state.loading;

export const LOADING_SELECTORS = {
  loading: loadingSelector,
};

const currentTodoIdSelector = (
  state: RootState,
): number | null => state.currentTodoId;

export const TODO_SELECTORS = {
  currentTodoId: currentTodoIdSelector,
};

const todosSelector = (state: RootState): Todo[] => state.todos;

export const TODOS_SELECTORS = {
  todos: todosSelector,
};

export const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk),
));
