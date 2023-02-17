import { Status } from '../types/Status';

type SetQueryAction = { type: 'filter/SET_QUERY', payload: string };
type SetStatusAction = { type: 'filter/SET_STATUS', payload: Status };
type RemoveQueryAction = { type: 'filter/REMOVE_QUERY' };

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

const removeQuery = (): RemoveQueryAction => ({ type: 'filter/REMOVE_QUERY' });

export const actions = { setQuery, setStatus, removeQuery };

type Action = SetQueryAction | SetStatusAction | RemoveQueryAction;

type Filter = {
  query: string,
  status: Status,
};

const startFilterOptions: Filter = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: Filter = startFilterOptions,
  action: Action,
) => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };

    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };

    case 'filter/REMOVE_QUERY':
      return { ...state, query: '' };

    default:
      return state;
  }
};

export default filterReducer;
