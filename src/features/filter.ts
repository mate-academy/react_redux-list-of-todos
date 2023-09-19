import { Filter } from '../types/Filter';
import { Status } from '../types/Status';

type RemoveQueryAction = { type: 'filter/REMOVE_QUERY' };

type SetQuery = {
  type: 'filter/SET_QUERY';
  payload: string;
};

type SetStatus = {
  type: 'filter/SET_STATUS';
  payload: Status;
};

type Action = RemoveQueryAction | SetQuery | SetStatus;

const removeQuery = (): RemoveQueryAction => ({ type: 'filter/REMOVE_QUERY' });

const setQuery = (query: string): SetQuery => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setStatus = (status: Status): SetStatus => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

export const actions = { removeQuery, setQuery, setStatus };

const initialState: Filter = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: Filter = initialState,
  action: Action,
): Filter => {
  switch (action.type) {
    case 'filter/REMOVE_QUERY':
      return { ...state, query: '' };

    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };

    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
