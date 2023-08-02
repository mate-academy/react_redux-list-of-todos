import { Status } from '../types/Status';

type SetQuery = {
  type: 'query/SET',
  payload: string,
};

type SetStatus = {
  type: 'status/SET',
  payload: Status,
};

const defaultState = {
  query: '',
  status: 'All' as Status,
};

const setStatus = (status: Status): SetStatus => ({
  type: 'status/SET',
  payload: status,
});

const setQuery = (query: string): SetQuery => ({
  type: 'query/SET',
  payload: query,
});

export const actions = { setQuery, setStatus };

type Actions = SetQuery | SetStatus;

const filterReducer = (
  state = defaultState,
  action: Actions,
) => {
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
