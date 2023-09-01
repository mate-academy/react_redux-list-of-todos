import { Status } from '../types/Status';

type SetQueryAction = { type: 'filter/setQuery', payload: string };
type ClearQueryAction = { type: 'filter/clearQuery' };
type SetStatusAction = { type: 'filter/setStatus', payload: Status };

type FilterAction = SetQueryAction | ClearQueryAction | SetStatusAction;

const setQuery = (value: string): SetQueryAction => ({
  type: 'filter/setQuery',
  payload: value,
});

const clearQuery = (): ClearQueryAction => ({
  type: 'filter/clearQuery',
});

const setStatus = (value: Status): SetStatusAction => ({
  type: 'filter/setStatus',
  payload: value,
});

export const actions = { setQuery, setStatus, clearQuery };

const filterReducer = (
  state = { query: '', status: Status.All },
  action: FilterAction,
) => {
  switch (action.type) {
    case 'filter/setQuery':
      return { ...state, query: action.payload };

    case 'filter/clearQuery':
      return { ...state, query: '' };

    case 'filter/setStatus':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
