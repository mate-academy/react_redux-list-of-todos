/* eslint-disable no-console */
import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { TodoWithUser } from '../interfaces';

const ACTIONS = {
  START_LOADING: 'START_LOADING',
  SET_TODOS: 'SET_TODOS',
  SET_VISIBLE_TODOS: 'SET_VISIBLE_TODOS',
  SET_ORDER: 'SET_ORDER',
};

export const setVisibleTodos = (field: string) => ({ type: ACTIONS.SET_VISIBLE_TODOS, field });
export const setTodos = (todos: TodoWithUser[]) => ({ type: ACTIONS.SET_TODOS, todos });
export const startLoading = () => ({ type: ACTIONS.START_LOADING });
export const setOrder = () => ({ type: ACTIONS.SET_ORDER });

export const isLoading = (state: RootState) => state.loading;
export const getTodos = (state: RootState) => state.todos;
export const getVisibleTodos = (state: RootState) => state.visibleTodos;

export type RootState = {
  loading: boolean;
  todos: TodoWithUser[];
  visibleTodos: TodoWithUser[];
  order: boolean;
};

const initialState: RootState = {
  loading: false,
  todos: [],
  visibleTodos: [],
  order: false,
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ACTIONS.START_LOADING:
      return { ...state, loading: !state.loading };
    case ACTIONS.SET_TODOS:
      return { ...state, todos: action.todos, visibleTodos: action.todos };
    case ACTIONS.SET_VISIBLE_TODOS:
      switch (action.field) {
        case 'title':
          return {
            ...state,
            visibleTodos: [...state.todos].sort((a, b) => a.title.localeCompare(b.title)),
          };

        case 'user':
          return {
            ...state,
            visibleTodos: [...state.todos].sort((a, b) => a.user.localeCompare(b.user)),
          };

        case 'completed':
          return {
            ...state,
            visibleTodos: [...state.todos].sort((a, b) => {
              return (a.completed > b.completed) ? 1 : -1;
            }),
          };
        default:
          return state;
      }

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

export default store;
