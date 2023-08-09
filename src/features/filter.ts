import { Status } from '../types/Status';

type RemoveQueryAction = { type: 'filter/removeQuery' };
type SetQueryAction = { type: 'filter/setQuery', payload: string };
type SetStatusAction = { type: 'filter/setStatus', payload: Status };

const removeQuery = (): RemoveQueryAction => ({ type: 'filter/removeQuery' });

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/setQuery', payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/setStatus', payload: status,
});

export const actions = {
  removeQuery,
  setQuery,
  setStatus,
};

type State = {
  query: string,
  status: Status,
};
type Action = RemoveQueryAction
| SetQueryAction
| SetStatusAction;

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/removeQuery':
      return { ...state, query: '' };
    case 'filter/setQuery':
      return { ...state, query: action.payload };
    case 'filter/setStatus':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
