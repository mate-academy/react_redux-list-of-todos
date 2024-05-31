import { Status } from '../types/Status';

type SetQueryActions = { type: 'filter/SET_QUERY'; payload: string };
type SetStatusAction = { type: 'filter/SET_STATUS'; payload: Status };

type Action = SetQueryActions | SetStatusAction;

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

const setQuery = (query: string): SetQueryActions => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

export const actions = { setQuery, setStatus };

type State = {
  query: string;
  status: Status;
};

const initialState: State = {
  query: '',
  status: 'all',
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const filterReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };

    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
