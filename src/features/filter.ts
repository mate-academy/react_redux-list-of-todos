import { Status } from '../types/Status';

type SetStatusAction = { type: 'filters/setStatus', payload: Status };
type SetQueryAction = { type: 'filters/setQuery', payload: string };
type ClearQueryAction = { type: 'filters/clearQuery' };

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filters/setStatus',
  payload: status,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'filters/setQuery',
  payload: query,
});

const clearQuery = (): ClearQueryAction => ({
  type: 'filters/clearQuery',
});

export const actions = { setStatus, setQuery, clearQuery };

type State = {
  status: Status,
  query: string,
};

type Action = SetStatusAction | SetQueryAction | ClearQueryAction;

const initialFilter = {
  status: Status.ALL,
  query: '',
};

const filterReducer = (
  state: State = initialFilter,
  action: Action,
) => {
  switch (action.type) {
    case 'filters/setStatus':
      return {
        ...state,
        status: action.payload,
      };
    case 'filters/setQuery':
      return {
        ...state,
        query: action.payload,
      };
    case 'filters/clearQuery':
      return {
        ...state,
        query: '',
      };

    default:
      return state;
  }
};

export default filterReducer;
