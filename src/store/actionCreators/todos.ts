import { ThunkAction } from 'redux-thunk';
import { getTodos } from '../../api';
import { RootState } from '../store';
import {
  FETCH_TODOS_FAILURE,
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
} from '../actionTypes/todos';
import { Todo } from '../../types/Todo';

type FetchTodosRequestyAction = {
  type: 'FETCH_TODOS_REQUEST';
};

type FetchTodosSuccessAction = {
  type: 'SET_FILTER';
  payload: Todo[];
};

type FetchTodosFailureAction = {
  type: 'FETCH_TODOS_FAILURE';
  payload: string;
};

/* eslint-disable-next-line */
type Action = FetchTodosRequestyAction | FetchTodosSuccessAction | FetchTodosFailureAction;

export const fetchTodosRequest = () => ({
  type: FETCH_TODOS_REQUEST,
});

export const fetchTodosSuccess = (todos: Todo[]) => ({
  type: FETCH_TODOS_SUCCESS,
  payload: todos,
});

export const fetchTodosFailure = (error: string) => ({
  type: FETCH_TODOS_FAILURE,
  payload: error,
});

/* eslint-disable-next-line */
export const fetchTodosAsync = (): ThunkAction<void, RootState, unknown, Action> =>
  async dispatch => {
    try {
      dispatch(fetchTodosRequest());
      const data = await getTodos();

      dispatch(fetchTodosSuccess(data));
    } catch (error: any) {
      dispatch(fetchTodosFailure(error.message));
    }
  };
