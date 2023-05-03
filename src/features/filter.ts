import { Status } from '../types/Status';

type SetQueryAction = { type: 'filter/SET_QUERY', payload: string };
type SetStatusAction = { type: 'filter/SET_STATUS', payload: Status };
type ClearQueryAction = { type: 'filter/CLEAR_QUERY' };

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

const clearQuery = (): ClearQueryAction => ({
  type: 'filter/CLEAR_QUERY',
});

export const actions = { setQuery, setStatus, clearQuery };

type Action = SetQueryAction | SetStatusAction | ClearQueryAction;
type State = {
  query: string,
  status: Status,
};

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state = initialState,
  action: Action,
): State => {
  const { type } = action;

  switch (type) {
    case 'filter/SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/SET_STATUS':
      return {
        ...state,
        status: action.payload,
      };

    case 'filter/CLEAR_QUERY':
      return {
        ...state,
        query: '',
      };

    default:
      return state;
  }
};

export default filterReducer;
