import { Status } from '../types/Status';

type Select = { type: 'filter/SELECT', payload: Status };
type Query = { type: 'filter/QUERY', payload: string };

const setSelect = (value: Status): Select => (
  { type: 'filter/SELECT', payload: value }
);
const setQuery = (value: string): Query => (
  { type: 'filter/QUERY', payload: value }
);

type Actions = Select | Query;

export type Filter = {
  query: string,
  status: Status,
};

export const actions = { setSelect, setQuery };

const filterReducer = (filter: Filter, action: Actions) => {
  switch (action.type) {
    case 'filter/SELECT':
      return { ...filter, status: action.payload };

    case 'filter/QUERY':
      return { ...filter, query: action.payload };

    default:
      return filter || {
        query: '',
        status: 'active',
      };
  }
};

export default filterReducer;
