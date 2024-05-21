import { Status } from '../types/Status';

type QueryAction = {
  type: 'filter/setQuery';
  payload: string;
};

type StatusAction = {
  type: 'filter/setStatus';
  payload: Status;
};

const setQuery = (query: string): QueryAction => ({
  type: 'filter/setQuery',
  payload: query,
});

const setStatus = (status: Status): StatusAction => ({
  type: 'filter/setStatus',
  payload: status,
});

export const actions = {
  setStatus,
  setQuery,
};

type State = {
  query: string;
  status: string;
};
type Action = QueryAction | StatusAction;

const initialState: State = {
  query: '',
  status: Status.All,
};

// eslint-disable-next-line
const filterReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'filter/setQuery':
      return { ...state, query: action.payload };

    case 'filter/setStatus':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
