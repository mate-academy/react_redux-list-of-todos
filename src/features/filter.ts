import { Status } from '../types/Status';

type SetStatusAction = {
  type: 'filter/STATUS',
  payload: Status,
};

type SetQueryAction = {
  type: 'filter/QUERY',
  payload: string,
};

type ClearQuery = {
  type: 'filter/CLEAR'
};

type State = {
  status: string,
  query: string,
};

type Actions = SetStatusAction
| SetQueryAction
| ClearQuery;

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/STATUS',
  payload: status,
});
const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/QUERY',
  payload: query,
});
const clearQuery = (): ClearQuery => ({ type: 'filter/CLEAR' });

const initialStatus = {
  status: 'all',
  query: '',
};

const filterReducer = (state: State = initialStatus, action: Actions) => {
  switch (action.type) {
    case 'filter/STATUS':
      return { ...state, status: action.payload };
    case 'filter/QUERY':
      return { ...state, query: action.payload };
    case 'filter/CLEAR':
      return { ...state, query: '' };
    default:
      return state;
  }
};

export const actions = { setQuery, setStatus, clearQuery };

export default filterReducer;
