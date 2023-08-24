import { Status } from '../types/Status';

type SetStatusFilterAction = {
  type: 'filter/SET_STATUS',
  payload: Status;
};
type SetQueryFilterAction = {
  type: 'filter/SET_QUERY',
  payload: string;
};
type ClearQueryFilterAction = {
  type: 'filter/CLEAR_QUERY',
};

type Action = SetStatusFilterAction
| SetQueryFilterAction
| ClearQueryFilterAction;

type Filter = {
  query: string;
  status: Status;
};

const setStatus = (status: Status): SetStatusFilterAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});
const setQuery = (query: string): SetQueryFilterAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});
const clearQuery = (): ClearQueryFilterAction => ({
  type: 'filter/CLEAR_QUERY',
});

export const actions = { setStatus, setQuery, clearQuery };

const initialFilter: Filter = {
  query: '',
  status: 'all',
};

const filterReducer = (
  filter: Filter = initialFilter,
  action: Action,
): Filter => {
  switch (action.type) {
    case 'filter/SET_STATUS':
      return {
        ...filter,
        status: action.payload,
      };

    case 'filter/SET_QUERY':
      return {
        ...filter,
        query: action.payload,
      };

    case 'filter/CLEAR_QUERY':
      return {
        ...filter,
        query: '',
      };

    default:
      return filter;
  }
};

export default filterReducer;
