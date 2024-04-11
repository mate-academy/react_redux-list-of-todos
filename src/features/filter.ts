import { Status } from '../types/Status';

type SetStatusAction = {
  type: 'status/SET';
  payload: Status;
};

type SetQueryAction = {
  type: 'query/SET';
  payload: string;
};

const setStatus = (status: Status): SetStatusAction => ({
  type: 'status/SET',
  payload: status,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'query/SET',
  payload: query,
});

export const actions = {
  setStatus,
  setQuery,
};

type State = {
  status: Status;
  query: string;
};

const initialFilterState: State = {
  query: '',
  status: Status.All,
};

type Action = SetQueryAction | SetStatusAction;

// eslint-disable-next-line @typescript-eslint/default-param-last
const filterReducer = (state: State = initialFilterState, action: Action) => {
  switch (action.type) {
    case 'query/SET':
      return { ...state, query: action.payload };

    case 'status/SET':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
