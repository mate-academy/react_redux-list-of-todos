import { Status } from '../types/Status';

const SET_QUERY = 'filter/setQuery';
const SET_STATUS = 'filter/setStatus';

type SetQueryAction = { type: typeof SET_QUERY; payload: string };
type SetStatusAction = { type: typeof SET_STATUS; payload: Status };

type Action = SetQueryAction | SetStatusAction;

const setQuery = (query: string): SetQueryAction => ({
  type: SET_QUERY,
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: SET_STATUS,
  payload: status,
});

export const actions = {
  setQuery,
  setStatus,
} as const;

type State = {
  query: string;
  status: Status;
};

const initialState: State = {
  query: '',
  status: Status.All,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const filterReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SET_QUERY:
      return { ...state, query: action.payload };

    case SET_STATUS:
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
