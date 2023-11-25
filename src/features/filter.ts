import { Filter } from '../types/Filter';
import { OptionValue } from '../types/OptionValue';

type SetStatus = {
  type: 'filter/SET_STATUS';
  payload: OptionValue;
};

type SetQuery = {
  type: 'filter/SET_QUERY';
  payload: string;
};

type ResetFilterQuery = {
  type: 'filter/RESET_QUERY',
};

const setStatus = (value: OptionValue): SetStatus => ({
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
    status: OptionValue.All,
  },
  action: Action,
): Filter => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...filter, query: action.payload.toLowerCase() };

    case 'filter/SET_STATUS':
      return { ...filter, status: action.payload };

    case 'filter/RESET_QUERY':
      return { ...filter, query: '' };

    default:
      return filter;
  }
};

export default filterReducer;
