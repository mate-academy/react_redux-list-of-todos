import { Status } from '../types/Status';

// #region Types
type SetQuery = {
  type: 'filter/SETQUERY',
  payload: string,
};
type SetStatus = {
  type: 'filter/SETSTATUS',
  payload: Status,
};
type ResetState = { type: 'filter/RESET' };
type ResetQuery = { type: 'filter/RESETQUERY' };
// #endregion

// #region Actions
const setQuery = (text: string): SetQuery => (
  { type: 'filter/SETQUERY', payload: text }
);
const setStatus = (newStatus: Status): SetStatus => (
  { type: 'filter/SETSTATUS', payload: newStatus }
);
const resetState = (): ResetState => ({ type: 'filter/RESET' });
const resetQuery = (): ResetQuery => ({ type: 'filter/RESETQUERY' });

export const actions = {
  setQuery,
  setStatus,
  resetState,
  resetQuery,
};
// #endregion

export type FilterState = {
  query: string,
  status: Status,
};
type Action = SetQuery | SetStatus | ResetState | ResetQuery;

const filterReducer = (
  state: FilterState = { query: '', status: 'all' },
  action: Action,
): FilterState => {
  switch (action.type) {
    case 'filter/SETQUERY':
      return { ...state, query: action.payload };

    case 'filter/SETSTATUS':
      return { ...state, status: action.payload };

    case 'filter/RESET':
      return { query: '', status: 'all' };

    case 'filter/RESETQUERY':
      return { ...state, query: '' };

    default:
      return state;
  }
};

export default filterReducer;
