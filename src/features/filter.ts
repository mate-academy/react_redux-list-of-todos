import { Status } from '../types/Status';

type SetStatusAction = { type: 'filter/STATUS', payload: Status };
type SetQueryAction = { type: 'filter/QUERY', payload: string };

export const actions = {
  setStatus: (status: Status): SetStatusAction => ({
    type: 'filter/STATUS',
    payload: status,
  }),

  setQuery: (query: string): SetQueryAction => ({
    type: 'filter/QUERY',
    payload: query,
  }),
};

type Filter = {
  status: Status;
  query: string;
};

const initialFilter: Filter = {
  status: Status.All,
  query: '',
};

type FilterAction = SetStatusAction | SetQueryAction;

const filterReducer = (
  filter: Filter = initialFilter,
  action: FilterAction,
): Filter => {
  switch (action.type) {
    case 'filter/STATUS':
      return { ...filter, status: action.payload };

    case 'filter/QUERY':
      return { ...filter, query: action.payload };

    default:
      return filter;
  }
};

export default filterReducer;
