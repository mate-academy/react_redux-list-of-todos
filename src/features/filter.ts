/* eslint-disable max-len */
import { Status } from '../types/Status';

type SetFilterAction = { type: 'filter/STATUS', payload: Status };
type SetQueryAction = { type: 'filter/QUERY', payload: string };

type Action = SetFilterAction | SetQueryAction;

const setFilter = (status: Status): SetFilterAction => ({
  type: 'filter/STATUS',
  payload: status,
});
const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/QUERY',
  payload: query,
});

type State = {
  status: Status,
  query: string,
};

const initialState = {
  status: 'all' as Status,
  query: '',
};

const filterReducer = (
  state: State = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'filter/STATUS':
      return {
        ...state,
        status: action.payload,
      };

    case 'filter/QUERY':
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
};

export const actions = { setFilter, setQuery };

export default filterReducer;
