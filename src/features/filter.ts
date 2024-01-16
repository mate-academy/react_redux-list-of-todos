/* eslint-disable max-len */
import { Status } from '../types/Status';

const ACTION_SET_FILTER_BY = 'action/SET_FILTER';
const ACTION_SET_QUERY = 'action/SET_QUERY';
const ACTION_CLEAR_QUERY = 'action/CLEAR_QUERY';

type SetFilterAction = { type: typeof ACTION_SET_FILTER_BY; payload: Status };
type SetQueryAction = { type: typeof ACTION_SET_QUERY; payload: string };
type ClearQueryAction = { type: typeof ACTION_CLEAR_QUERY };

const setFilterBy = (status: Status): SetFilterAction => ({
  type: ACTION_SET_FILTER_BY,
  payload: status,
});
const setQuery = (query: string): SetQueryAction => ({
  type: ACTION_SET_QUERY,
  payload: query,
});

const clearQuery = (): ClearQueryAction => ({
  type: ACTION_CLEAR_QUERY,
});

type State = {
  filterBy: Status;
  query: string;
};
type Action = SetFilterAction | SetQueryAction | ClearQueryAction;

export const actions = { setFilterBy, setQuery, clearQuery };
const initialState: State = { filterBy: 'all', query: '' };
const filterReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ACTION_SET_FILTER_BY:
      return { ...state, filterBy: action.payload };
    case ACTION_SET_QUERY:
      return { ...state, query: action.payload };
    case ACTION_CLEAR_QUERY:
      return { ...state, query: '' };
    default:
      return state;
  }
};

export default filterReducer;
