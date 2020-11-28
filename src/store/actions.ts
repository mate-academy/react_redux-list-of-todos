import { Dispatch } from "redux";
import { request } from "../api/api";
import { User } from "../Interfaces";

import {
  GET_TODOS,
  UPDATE_USER_ID,
  UPDATE_TODO_ID,
  GET_USER,
  CLEAR,
  GET_USER_ERROR,
  RESET_ERRORS,
  USER_LOADING,
} from "./types";

// Action creators - a function returning an action object

export const getTodos = (todos: any[]) => ({
  type: GET_TODOS,
  todos,
});

export const fetchTodos = () => (dispatch: Dispatch) => {
  request("todos").then((res) => dispatch(getTodos(res.data)));
};

export const updateUserID = (id: number) => ({
  type: UPDATE_USER_ID,
  id,
});

export const updateTodoId = (id: number) => ({
  type: UPDATE_TODO_ID,
  id,
});

export const getUserError = () => ({
  type: GET_USER_ERROR,
});

export const updateUserLoading = (bool: boolean) => ({
  type: USER_LOADING,
  bool,
});

export const getUser = (user: User | {}) => ({
  type: GET_USER,
  user,
});

export const fetchUser = (id: number) => (dispatch: Dispatch) => {
  dispatch(updateUserLoading(true));

  request(`users/${id}`)
    .then((res) => {
      dispatch(resetErrors());
      if (res.data) {
        dispatch(getUser(res.data));
        dispatch(updateUserLoading(false));
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      dispatch(getUser({}));
      dispatch(getUserError());
      dispatch(updateUserLoading(false));
    });
};

export const clear = () => ({
  type: CLEAR,
});

export const resetErrors = () => ({
  type: RESET_ERRORS,
});
