import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

type SetStatusAction = {
  type: 'filter/SET_STATUS';
  payload: Status;
};

type ClearQueryAction = {
  type: 'filter/CLEAR_QUERY';
};

type Action = SetQueryAction | SetStatusAction | ClearQueryAction;

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

export const clearQuery = (): ClearQueryAction => ({
  type: 'filter/CLEAR_QUERY',
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

export type FilterState = {
  query: string;
  status: Status;
};

const initialState: FilterState = {
  query: '',
  status: Status.All,
};

const filterReducer = (
  state: FilterState = initialState,
  action: Action,
): FilterState => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };

    case 'filter/CLEAR_QUERY':
      return { ...state, query: '' };

    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export const actions = { setQuery, setStatus, clearQuery };

export default filterReducer;
