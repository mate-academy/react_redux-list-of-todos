import { Status } from '../types/Status';

type SetFilter = {
  type: 'filter/SetFilter';
  payload: Status;
};

type SetQuery = {
  type: 'filter/SetQuery';
  payload: string;
};

type RemoveQuery = {
  type: 'filter/RemoveQuery';
};

const removeQuery = (): RemoveQuery => ({ type: 'filter/RemoveQuery' });

const setQuery = (newQuery: string): SetQuery => ({
  type: 'filter/SetQuery',
  payload: newQuery,
});

const setFilter = (newStatus: Status): SetFilter => ({
  type: 'filter/SetFilter',
  payload: newStatus,
});

export const actions = {
  removeQuery,
  setQuery,
  setFilter,
};

type Action = SetFilter | SetQuery | RemoveQuery;
type State = {
  query: string;
  filter: Status;
};

const filterReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: State = { query: '', filter: Status.All },
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/SetFilter':
      return { ...state, filter: action.payload };
    case 'filter/SetQuery':
      return { ...state, query: action.payload };
    case 'filter/RemoveQuery':
      return { ...state, query: '' };
    default:
      return state;
  }
};

export default filterReducer;
