/* eslint-disable no-console */
import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { TodoWithUser } from '../interfaces';

const ACTIONS = {
  START_LOADING: 'START_LOADING',
  GET_TODOS: 'GET_TODOS',
};

export const setTodos = (todos: TodoWithUser[]) => ({ type: ACTIONS.GET_TODOS, todos });
export const startLoading = () => ({ type: ACTIONS.START_LOADING });

export const isLoading = (state: RootState) => state.loading;
export const getTodos = (state: RootState) => state.todos;

export type RootState = {
  loading: boolean;
  todos: TodoWithUser[];
};

const initialState: RootState = {
  loading: false,
  todos: [{id: 1, title: "delectus aut autem", completed: false, user: "Leanne Graham"}],
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ACTIONS.START_LOADING:
      return { ...state, loading: true };
    case ACTIONS.GET_TODOS:
      console.log(action.todos);

      return { ...state, todos: action.todos };

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

export default store;
