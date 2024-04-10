import { RootState } from '../app/store';
import { Status } from '../types/Status';

type SetStatusAction = { type: 'filter/set-status'; payload: Status };
type SetQueryAction = { type: 'filter/set-query'; payload: string };
type Action = SetStatusAction | SetQueryAction;

type State = {
  query: string;
  status: Status;
};

export const actions = {
  setStatus: (status: Status): SetStatusAction => ({
    payload: status,
    type: 'filter/set-status',
  }),
  setQuery: (query: string): SetQueryAction => ({
    payload: query,
    type: 'filter/set-query',
  }),
};

const defaultState: State = { query: '', status: 'all' };

const filterReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: State = defaultState,
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/set-query':
      return { ...state, query: action.payload };

    case 'filter/set-status':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export const filterSelector = (state: RootState) => state.filter;

export default filterReducer;
