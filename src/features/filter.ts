import { Status } from '../types/Status';

type SetQueryAction = { type: 'query/SET'; payload: string };
type ClearQueryAction = { type: 'query/CLEAR' };
type SetFilterAction = { type: 'filter/SET'; payload: Status };
type ClearFilterAction = { type: 'filter/CLEAR' };

const setQuery = (query: string): SetQueryAction => ({
  type: 'query/SET',
  payload: query,
});
const clearQuery = (): ClearQueryAction => ({ type: 'query/CLEAR' });
const setFilter = (sortBy: Status): SetFilterAction => ({
  type: 'filter/SET',
  payload: sortBy,
});
const clearFilter = (): ClearFilterAction => ({ type: 'filter/CLEAR' });

export const actions = {
  setQuery,
  clearQuery,
  setFilter,
  clearFilter,
};

type State = {
  query: string;
  status: Status;
};
type Action =
  | SetQueryAction
  | ClearQueryAction
  | SetFilterAction
  | ClearFilterAction;

const filterReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: State = { query: '', status: 'all' },
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/SET':
      return { ...state, status: action.payload };

    case 'filter/CLEAR':
      return { ...state, status: 'all' };

    case 'query/SET':
      return { ...state, query: action.payload };

    case 'query/CLEAR':
      return { ...state, query: '' };

    default:
      return state;
  }
};

export default filterReducer;
