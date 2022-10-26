import type { RootState } from '../app/store';
import { Status } from '../types/Status';

export enum FilterActionType {
  setQuery = 'filter/query/SET',
  setStatus = 'filter/status/SET',
}

type SetQueryAction = {
  type: FilterActionType.setQuery,
  payload: string,
};

type SetStatusAction = {
  type: FilterActionType.setStatus,
  payload: Status,
};

const setQuery = (title: string): SetQueryAction => ({
  type: FilterActionType.setQuery,
  payload: title,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: FilterActionType.setStatus,
  payload: status,
});

export const FILTER_ACTIONS = { setQuery, setStatus };

export const FILTER_SELECTORS = {
  getQuery: (state: RootState) => state.filter.query,
  getStatus: (state: RootState) => state.filter.status,
};

type State = {
  query: string,
  status: Status,
};

type Action = SetQueryAction | SetStatusAction;

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case FilterActionType.setQuery:
      return { ...state, query: action.payload };
    case FilterActionType.setStatus:
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
