import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { TodoWithUser } from '../interfaces';
import { sortBy } from './sortBy';

const ACTIONS = {
  START_LOADING: 'START_LOADING',
  SET_TODOS: 'SET_TODOS',
  SET_VISIBLE_TODOS: 'SET_VISIBLE_TODOS',
  SET_ORDER: 'SET_ORDER',
};

export const setVisibleTodos = (field: string) => ({ type: ACTIONS.SET_VISIBLE_TODOS, payload: field });
export const setTodos = (todos: TodoWithUser[]) => ({ type: ACTIONS.SET_TODOS, payload: todos });
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
  order: true,
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ACTIONS.START_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case ACTIONS.SET_TODOS:
      return {
        ...state,
        todos: action.payload,
        visibleTodos: action.payload,
      };
    case ACTIONS.SET_VISIBLE_TODOS:
      return {
        ...state,
        visibleTodos: sortBy(action.payload, state.todos, state.order),
        order: !state.order,
      };
    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

export default store;
