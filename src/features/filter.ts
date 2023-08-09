import { Status } from '../types/Status';

type SetStatus = {
  type: 'filter/SETSTATUS',
  payload: Status
};

type SetQuery = {
  type: 'filter/SETQUERY',
  payload: string
};

type Action = SetStatus | SetQuery;

type State = {
  query: string;
  status: Status;
};

const setStatus = (status: Status): SetStatus => ({
  type: 'filter/SETSTATUS',
  payload: status,
});

const setQuery = (query: string): SetQuery => ({
  type: 'filter/SETQUERY',
  payload: query,
});

export const actions = { setStatus, setQuery };
const initialState: State = {
  query: '',
  status: Status.ALL,
};

const filterReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'filter/SETSTATUS':
      return {
        ...state,
        status: action.payload,
      };

    case 'filter/SETQUERY':
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
