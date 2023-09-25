import { Status } from '../types/Status';

type SetStatusAction = {
  type: 'filter/SET_STATUS';
  payload: Status;
};

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

export const actions = { setStatus, setQuery };

type Filter = {
  status: Status;
  query: string;
};

const startFilter: Filter = { status: Status.All, query: '' };

type Action = SetStatusAction | SetQueryAction;

const filterReducer = (
  filterState: Filter = startFilter,
  action: Action,
): Filter => {
  switch (action.type) {
    case 'filter/SET_STATUS':
      return { ...filterState, status: action.payload };

    case 'filter/SET_QUERY':
      return { ...filterState, query: action.payload };

    default:
      return filterState;
  }
};

export default filterReducer;
