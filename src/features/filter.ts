import { Filter } from '../types/Filter';
import { Status } from '../types/Status';

type SetStatus = {
  type: 'filter/SET_STATUS';
  payload: Status;
};

type SetQuery = {
  type: 'filter/SET_QUERY';
  payload: string;
};

type ResetFilterQuery = {
  type: 'filter/RESET_QUERY',
};

const setStatus = (value: Status): SetStatus => ({
  type: 'filter/SET_STATUS',
  payload: value,
});

const setQuery = (value: string): SetQuery => ({
  type: 'filter/SET_QUERY',
  payload: value,
});

const resetFilterQuery = (): ResetFilterQuery => ({
  type: 'filter/RESET_QUERY',
});

export const actions = { setStatus, setQuery, resetFilterQuery };

type Action = SetStatus | SetQuery | ResetFilterQuery;

const filterReducer = (
  filter: Filter = {
    query: '',
    status: Status.All,
  },
  action: Action,
): Filter => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...filter, query: action.payload };

    case 'filter/SET_STATUS':
      return { ...filter, status: action.payload };

    case 'filter/RESET_QUERY':
      return { ...filter, query: '' };

    default:
      return filter;
  }
};

export default filterReducer;
