import { createStore, AnyAction, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import * as types from "./types";
import thunk from "redux-thunk";
import { User } from "../Interfaces";

export const isLoading = (state: RootState) => state.loading;
export const getTodosSelector = (state: RootState) => state.todos;
export const getUserId = (state: RootState) => state.userId;
export const getTodoId = (state: RootState) => state.todoId;
export const getUser = (state: RootState) => state.user;

export type RootState = {
  loading: boolean;
  todos: any[];
  userId: number;
  todoId: number;
  user: null | User;
};

const initialState: RootState = {
  loading: false,
  todos: [],
  userId: 2,
  todoId: 2,
  user: null,
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.START_LOADING:
      return { ...state, loading: true };

    case types.FINISH_LOADING:
      return { ...state, loading: false };

    case types.GET_TODOS:
      return { ...state, todos: action.todos };

    case types.GET_USER:
      return { ...state, user: action.user };

    case types.UPDATE_USER_ID:
      return { ...state, userId: action.id };

    case types.UPDATE_TODO_ID:
      return { ...state, todoId: action.id };

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
