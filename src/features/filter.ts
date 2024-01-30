import { Status } from '../types/Status';
import { Filter } from '../types/Filters';

type SetStatusAction = {
  type: 'filter/SET_STATUS';
  payload: Status;
};

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

type ResetQueryAction = {
  type: 'filter/RESET_QUERY',
};

const setStatus = (value: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: value,
});

const setQuery = (value: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: value,
});

const resetQuery = (): ResetQueryAction => ({
  type: 'filter/RESET_QUERY',
});

export const actions = { setStatus, setQuery, resetQuery };

type Action = SetStatusAction | SetQueryAction | ResetQueryAction;

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
