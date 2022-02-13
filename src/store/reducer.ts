import { AnyAction } from 'redux';

export enum ReducerActions {
  FETCH_TODOS = 'FETCH_TODOS',
  FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS',
  FETCH_TODOS_ERROR = 'FETCH_TODOS_ERROR',
  SET_USER_ID = 'SET_USER_ID',
}

const initialState: State = {
  todos: [],
  loading: false,
  error: null,
  userId: 0,
};

export const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ReducerActions.FETCH_TODOS:
      return {
        todos: [],
        loading: true,
        error: null,
        userId: 0,
      };

    case ReducerActions.FETCH_TODOS_SUCCESS:
      return {
        todos: action.payload,
        loading: false,
        error: null,
        userId: 0,
      };

    case ReducerActions.FETCH_TODOS_ERROR:
      return {
        todos: [],
        loading: false,
        error: action.payload,
        userId: 0,
      };

    case ReducerActions.SET_USER_ID:
      return {
        ...state,
        userId: action.payload,
      };

    default:
      return state;
  }
};

export type RootState = ReturnType<typeof reducer>;
