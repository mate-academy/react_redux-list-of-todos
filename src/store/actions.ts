import { Dispatch } from "redux";
import { request } from "../api/api";
import { User } from "../Interfaces";

import {
  START_LOADING,
  FINISH_LOADING,
  GET_TODOS,
  UPDATE_USER_ID,
  UPDATE_TODO_ID,
  GET_USER,
} from "./types";

// Action creators - a function returning an action object
export const startLoading = () => ({ type: START_LOADING });

export const finishLoading = (message = "No message") => ({
  type: FINISH_LOADING,
  message,
});

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

export const getUser = (user: User) => ({
  type: GET_USER,
  user,
});

export const fetchUser = (id: number) => (dispatch: Dispatch) => {
  request(`users/${id}`).then((res) => dispatch(getUser(res.data)));
};
