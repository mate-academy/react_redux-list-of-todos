import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'query/SET';
  payload: string;
};
type SetStatusAction = {
  type: 'status/SET';
  payload: Status;
};
type ResetQueryAction = {
  type: 'query/RESET';
};

export const actions = {
  setQuery: (query: string): SetQueryAction => ({
    type: 'query/SET',
    payload: query,
  }),
  resetQuery: (): ResetQueryAction => ({ type: 'query/RESET' }),
  setStatus: (status: Status): SetStatusAction => ({
    type: 'status/SET',
    payload: status,
  }),
};

type FilterAction = SetQueryAction | SetStatusAction | ResetQueryAction;

type Filter = {
  query: string;
  status: Status;
};

const defaultState: Filter = {
  query: '',
  status: 'all',
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const filterReducer = (state = defaultState, action: FilterAction): Filter => {
  switch (action.type) {
    case 'query/SET':
      return { ...state, query: action.payload };
    case 'query/RESET':
      return { ...state, query: '' };
    case 'status/SET':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
