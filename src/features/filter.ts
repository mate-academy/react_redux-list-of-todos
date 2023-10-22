import { Status } from '../types/Status';

type SetFilterAction = { type: 'filter/STATUS', payload: Status };
type SetQueryAction = { type: 'filter/QUERY', payload: string };

type Action = SetFilterAction | SetQueryAction;

const setFilter = (status: Status): SetFilterAction => ({
  type: 'filter/STATUS', payload: status,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/QUERY',
  payload: query,
});

export const actions = { setQuery, setFilter };

type State = {
  query: string,
  status: Status,
};

const initialState = {
  query: '',
  status: 'all' as Status,
};

const filterReducer = (filter: State = initialState, action: Action) => {
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
