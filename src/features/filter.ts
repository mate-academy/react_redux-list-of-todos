import { Status } from '../types/Status';

type SetQuery = { type: 'query/SET', payload: string };
type ClearQuery = { type: 'query/CLEAR' };
type SetStatus = { type: 'status/SET', payload: Status };

type Action = SetQuery | ClearQuery | SetStatus;

const setQuery = (value: string): SetQuery => (
  { type: 'query/SET', payload: value }
);
const clearQuery = (): ClearQuery => ({ type: 'query/CLEAR' });
const setStatus = (value: Status): SetStatus => (
  { type: 'status/SET', payload: value }
);

export const actions = { setQuery, clearQuery, setStatus };

type Filter = {
  query: string;
  status: Status;
};

const initialFilterState: Filter = {
  query: '',
  status: 'all',
};

const filterReducer = (
  filter: Filter = initialFilterState,
  action: Action,
): Filter => {
  switch (action.type) {
    case 'query/SET':
      return { ...filter, query: action.payload };
    case 'query/CLEAR':
      return { ...filter, query: '' };
    case 'status/SET':
      return { ...filter, status: action.payload };
    default:
      return filter;
  }
};

export default filterReducer;
