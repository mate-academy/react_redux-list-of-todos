import { Status } from '../types/Status';

type SetQueryAction = { type: 'filter/QUERY', payload: string };
type SetStatusAction = { type: 'filter/STATUS', payload: Status };

const setQuery = (query: string): SetQueryAction => (
  { type: 'filter/QUERY', payload: query }
);

const setStatus = (status: Status): SetStatusAction => (
  { type: 'filter/STATUS', payload: status }
);

type State = {
  query: string,
  status: Status,
};

type Action = SetQueryAction | SetStatusAction;

export const actions = { setQuery, setStatus };

const InitialState = {
  query: '',
  status: 'all' as Status,
};

const filterReducer = (
  filter: State = InitialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/STATUS':
      return {
        ...filter,
        status: action.payload,
      };

    case 'filter/QUERY':
      return {
        ...filter,
        query: action.payload.toLowerCase(),
      };

    default:
      return filter;
  }
};

export default filterReducer;
