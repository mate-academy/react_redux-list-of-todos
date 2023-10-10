import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

type ClearQueryAction = {
  type: 'filter/CLEAR_QUERY';
};

type SetStatusAction = {
  type: 'filter/SET_STATUS';
  payload: Status;
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const clearQuery = (): ClearQueryAction => ({
  type: 'filter/CLEAR_QUERY',
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

type Action = SetQueryAction | ClearQueryAction | SetStatusAction;

type Filter = {
  query: string;
  status: Status;
};

const initialState: Filter = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: Filter = initialState,
  action: Action,
): Filter => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };

    case 'filter/CLEAR_QUERY':
      return { ...state, query: '' };

    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };

    default:
      return initialState;
  }
};

export const filterActions = { setQuery, clearQuery, setStatus };

export default filterReducer;
