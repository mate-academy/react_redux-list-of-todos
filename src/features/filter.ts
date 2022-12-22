import { Status } from '../types/Status';

type FilterState = {
  query: string;
  status: Status;
};

const initialState: FilterState = {
  query: '',
  status: Status.ALL,
};

type SetQueryAction = { type: 'filter/SET_QUERY', payload: string };
type SetClearQueryAction = { type: 'filter/CLEAR_QUERY' };
type SetStatusAction = { type: 'filter/STATUS', payload: Status };

const setQuery = (value: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: value,
});
const clearQuery = (): SetClearQueryAction => ({ type: 'filter/CLEAR_QUERY' });
const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/STATUS',
  payload: status,
});

export const actions = { setQuery, clearQuery, setStatus };

type Action = SetQueryAction | SetClearQueryAction | SetStatusAction;

const filterReducer = (
  state: FilterState = initialState,
  action: Action,
): FilterState => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/STATUS':
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
