import { TodoStatusTypes } from '../types/enums/TodoStatusTypes';

export enum FilterActions {
  SET_STATUS = 'filter/SET_STATUS',
  SET_QUERY = 'filter/SET_QUERY',
  CLEAR_QUERY = 'filter/CLEAR_QUERY',
}

type ValueOf<T> = T[keyof T];

type StatusActionType = {
  type: FilterActions.SET_STATUS,
  payload: ValueOf<TodoStatusTypes>,
};

type SetQueryActionType = {
  type: FilterActions.SET_QUERY,
  payload: string,
};

type ClearQueryActionType = {
  type: FilterActions.CLEAR_QUERY,
  payload: string,
};

const setStatus = (status: ValueOf<TodoStatusTypes>): StatusActionType => ({
  type: FilterActions.SET_STATUS,
  payload: status,
});

const setQuery = (query: string): SetQueryActionType => ({
  type: FilterActions.SET_QUERY,
  payload: query,
});

const clearQuery = (): ClearQueryActionType => ({
  type: FilterActions.CLEAR_QUERY,
  payload: '',
});

export const actions = {
  setStatus,
  setQuery,
  clearQuery,
};

export type State = {
  query: string,
  status: ValueOf<TodoStatusTypes>,
};

const initialState: State = {
  query: '',
  status: TodoStatusTypes.ALL,
};

type Action = StatusActionType | SetQueryActionType | ClearQueryActionType;

const filterReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case FilterActions.SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };

    case FilterActions.SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };

    case FilterActions.CLEAR_QUERY:
      return {
        ...state,
        query: '',
      };

    default:
      return state;
  }
};

export default filterReducer;
