import { Status } from '../types/Status';

type Filter = {
  query: string;
  status: Status;
};

const initialFilter: Filter = {
  query: '',
  status: 'all',
};

type SetQueryAction = { type: 'query/SET'; payload: string };
type RemoveQueryAction = { type: 'query/REMOVE' };
type SetStatusAction = { type: 'status/SET'; payload: Status };

const setQuery = (query: string): SetQueryAction => ({
  type: 'query/SET',
  payload: query,
});

const removeQuery = (): RemoveQueryAction => ({ type: 'query/REMOVE' });

const setStatus = (status: Status): SetStatusAction => ({
  type: 'status/SET',
  payload: status,
});

export const actions = { setQuery, removeQuery, setStatus };

type Action = SetQueryAction | RemoveQueryAction | SetStatusAction;

// eslint-disable-next-line @typescript-eslint/default-param-last
const filterReducer = (filter = initialFilter, action: Action): Filter => {
  switch (action.type) {
    case 'query/SET':
      return {
        ...filter,
        query: action.payload,
      };
    case 'query/REMOVE':
      return {
        ...filter,
        query: '',
      };
    case 'status/SET':
      return {
        ...filter,
        status: action.payload,
      };

    default:
      return filter;
  }
};

export default filterReducer;
