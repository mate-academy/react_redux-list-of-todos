import { Status } from '../types/Status';

type SetQueryAction = { type: 'query/SET', payload: string };
type RemoveQueryAction = { type: 'query/REMOVE' };
type SetStatusAction = { type: 'status/SET', payload: Status };

type Action = SetQueryAction | RemoveQueryAction | SetStatusAction;

const setQuery = (query: string): SetQueryAction => (
  { type: 'query/SET', payload: query }
);
const removeQuery = (): RemoveQueryAction => ({ type: 'query/REMOVE' });

const setStatus = (status: Status): SetStatusAction => (
  { type: 'status/SET', payload: status }
);

export const actions = { setQuery, removeQuery, setStatus };

type Filter = {
  query: string,
  status: Status,
};

const initiialFilter: Filter = {
  query: '',
  status: Status.ALL,
};

const filterReducer = (
  filter: Filter = initiialFilter,
  action: Action,
) => {
  switch (action.type) {
    case 'query/SET':
      return { ...filter, query: action.payload };

    case 'query/REMOVE':
      return { ...filter, query: '' };

    case 'status/SET':
      return { ...filter, status: action.payload };

    default:
      return filter;
  }
};

export default filterReducer;
