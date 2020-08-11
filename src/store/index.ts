import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Todo } from '../interfaces';
import { sortBy } from './sort';

const actions = {
  TOGGLE_LOADING: 'TOGGLE_LOADING',
  SET_TODOS: 'SET_TODOS',
  SORT: 'SORT',
  REMOVE_TODO: 'REMOVE_TODO',
};

export const toggleLoading = () => ({ type: actions.TOGGLE_LOADING });
export const setTodos = (todos: Todo[]) => ({ type: actions.SET_TODOS, todos });
export const sortTodos = (sortType: string) => ({ type: actions.SORT, sortType });
export const removeTodo = (todoId: number) => ({ type: actions.REMOVE_TODO, todoId });

export const isLoading = (state: RootState) => state.loading;
export const getTodos = (state: RootState) => state.todos;

export type RootState = {
  loading: boolean;
  todos: Todo[];
  order: boolean;
};

const initialState: RootState = {
  loading: false,
  todos: [],
  order: false,
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case actions.TOGGLE_LOADING:
      return { ...state, loading: !state.loading };

    case actions.SET_TODOS:
      return { ...state, todos: action.todos };

    case actions.SORT:
      return {
        ...state,
        todos: sortBy(action.sortType, state.todos, state.order),
        order: !state.order,
      };

    case actions.REMOVE_TODO:
      return {
        ...state,
        todos: [...state.todos].filter(todo => todo.id !== action.todoId),
      };

    default:
      return state;
  }
};

const store = createStore(
  reducer,
  composeWithDevTools(),
);

export default store;
