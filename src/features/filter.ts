import { Filter } from '../types/Filter';

type SetFilterTypeAction = {
  type: 'filter/SET_FILTER_TYPE';
  payload: string;
};

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

type ClearQueryAction = { type: 'filter/CLEAR_QUERY' };

const setFilterType = (type: string): SetFilterTypeAction => ({
  type: 'filter/SET_FILTER_TYPE',
  payload: type,
});

const setQuery = (type: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: type,
});

const clearQuery = (): ClearQueryAction => ({ type: 'filter/CLEAR_QUERY' });

export const actions = { setFilterType, setQuery, clearQuery };

type State = {
  query: string,
  filterType: string
};

const initialState: State = { query: '', filterType: Filter.ALL };

type Action = SetFilterTypeAction | SetQueryAction | ClearQueryAction;

const filterReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/SET_FILTER_TYPE':
      return { ...state, filterType: action.payload };
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };
    case 'filter/CLEAR_QUERY':
      return { ...state, query: '' };
    default:
      return state;
  }
};

export default filterReducer;
