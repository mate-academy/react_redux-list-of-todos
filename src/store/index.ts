/* eslint-disable max-len */
import {
  createStore, AnyAction, applyMiddleware, Dispatch,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { getTodos, getUser } from '../utils/api';
import { TODO, User, RootState } from '../utils/types';

// Action types - is just a constant. MUST have a unique value.
const GET_TODOS = 'GET_TODOS';
const TODOS_ERROR_STATE = 'TODOS_ERROR_STATE';
const TODOS_ERROR_TEXT = 'TODOS_ERROR_TEXT';
const SET_QUERY = 'SET_QUERY';
const SET_SORTBY = 'SET_SORTBY';
const SET_USER = 'SET_USER';
const SET_USERID = 'SET_USERID';
const SET_USER_ERROR_STATE = 'SET_USER_ERROR_STATE';
const USER_ERROR_TEXT = 'USER_ERROR_TEXT';

// Action creators - a function returning an action object
export const setTodos = (todos: TODO[]) => ({ type: GET_TODOS, value: todos });
export const setErrorStatus = (error: boolean) => ({ type: TODOS_ERROR_STATE, value: error });
export const setErrorText = (error: string) => ({ type: TODOS_ERROR_TEXT, value: error });
export const setQuery = (query: string) => ({ type: SET_QUERY, value: query });
export const setSortBy = (sortBy: string) => ({ type: SET_SORTBY, value: sortBy });
export const setUser = (user: User) => ({ type: SET_USER, value: user });
export const setUserID = (id: number) => ({ type: SET_USERID, value: id });
export const setUserErrorStatus = (error: boolean) => ({ type: SET_USER_ERROR_STATE, value: error });
export const setUserErrorText = (error: string) => ({ type: USER_ERROR_TEXT, value: error });

// Selectors - a function receiving Redux state and returning some data from it
export const getListOfTodos = (state: RootState) => state.todos;
export const isErrorTodo = (state: RootState) => state.isErrorTODO;
export const getErrorText = (state: RootState) => state.errorText;
export const getQuery = (state: RootState) => state.query;
export const getSortQuery = (state: RootState) => state.sortBy;
export const getNewUser = (state: RootState) => state.user;
export const getUserID = (state: RootState) => state.userId;
export const isErrorUser = (state: RootState) => state.isErrorUser;
export const getLoadUserError = (state: RootState) => state.userErrorText;

// Initial stat
const initialState: RootState = {
  todos: [],
  isErrorTODO: false,
  isErrorUser: false,
  errorText: '',
  userErrorText: '',
  query: '',
  sortBy: '',
  user: {},
  userId: 0,
};

export const getTodosfromServer = () => {
  return (dispatch: Dispatch) => {
    getTodos()
      .then((todos) => {
        dispatch(setTodos(todos));
      })
      .catch((result) => {
        dispatch(setErrorStatus(true));
        dispatch(setErrorText(result.message));
      });
  };
};

export const getUserFromServer = (id: number) => {
  return (dispatch: Dispatch) => {
    getUser(id)
      .then((user) => {
        dispatch(setUser(user));
      })
      .catch((result) => {
        dispatch(setUserErrorStatus(true));
        dispatch(setUserErrorText(result.message));
      });
  };
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: [...action.value],
      };

    case TODOS_ERROR_STATE:
      return {
        ...state,
        isErrorTODO: action.value,
      };

    case TODOS_ERROR_TEXT:
      return {
        ...state,
        errorText: action.value,
      };

    case SET_QUERY:
      return {
        ...state,
        query: action.value,
      };

    case SET_SORTBY:
      return {
        ...state,
        sortBy: action.value,
      };

    case SET_USER:
      return {
        ...state,
        user: action.value,
      };

    case SET_USERID:
      return {
        ...state,
        userId: action.value,
      };

    case SET_USER_ERROR_STATE:
      return {
        ...state,
        isErrorUser: action.value,
      };

    case USER_ERROR_TEXT:
      return {
        ...state,
        userErrorText: action.value,
      };

    default:
      return state;
  }
};

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)), // allows you to use http://extension.remotedev.io/
);

export default store;
