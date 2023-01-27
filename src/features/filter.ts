import { Filter } from '../types/Filter';
import { Status } from '../types/Status';

type SetStatusAction = { type: 'filter/SETSTATUS', payload: Status };
type SetQueryAction = { type: 'filter/SETQUERY', payload: string };

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SETSTATUS',
  payload: status,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SETQUERY',
  payload: query,
});

type Action = SetQueryAction | SetStatusAction;

const defaultFilter: Filter = {
  query: '',
  status: 'all',
};

export const actions = { setQuery, setStatus };

const filterReducer = (
  filter: Filter = defaultFilter,
  action: Action,
): Filter => {
  switch (action.type) {
    case 'filter/SETQUERY':
      return { ...filter, query: action.payload };
    case 'filter/SETSTATUS':
      return { ...filter, status: action.payload };
    default:
      return filter;
  }
};

export default filterReducer;
