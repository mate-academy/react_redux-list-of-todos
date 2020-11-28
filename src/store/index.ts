import { createStore, AnyAction, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import * as types from "./types";
import thunk from "redux-thunk";
import { User } from "../Interfaces";

export const getTodosSelector = (state: RootState) => state.todos;
export const getUserId = (state: RootState) => state.userId;
export const getTodoId = (state: RootState) => state.todoId;
export const getUser = (state: RootState) => state.user;
export const getErrors = (state: RootState) => state.errors;
export const getUserLoading = (state: RootState) => state.userLoading;

export type RootState = {
  todos: any[];
  userId: number;
  todoId: number;
  user: null | User;
  errors: { [key: string]: any };
  userLoading: boolean;
};

const initialState: RootState = {
  todos: [],
  userId: 0,
  todoId: 0,
  user: null,
  errors: {},
  userLoading: false,
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.GET_TODOS:
      return { ...state, todos: action.todos };

    case types.GET_USER:
      return { ...state, user: action.user };

    case types.GET_USER_ERROR:
      return { ...state, errors: { ...state.errors, user: "User not found" } };

    case types.UPDATE_USER_ID:
      return { ...state, userId: action.id };

    case types.UPDATE_TODO_ID:
      return { ...state, todoId: action.id };

    case types.CLEAR:
      return { ...state, todoId: 0, userId: 0, user: {} };

    case types.RESET_ERRORS:
      return { ...state, errors: {} };

    case types.USER_LOADING:
      return { ...state, userLoading: action.bool };

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
