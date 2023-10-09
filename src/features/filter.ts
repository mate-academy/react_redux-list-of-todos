import { Filter } from '../types/Filter';

type SetStatusAction = {
  type: 'filter/SET_STATUS',
  payload: Filter,
};
type SetQueryAction = {
  type: 'filter/SET_QUERY',
  payload: string,
};

type ClearQueryAction = {
  type: 'filter/CLEAR'
};

const setStatus = (payload: Filter): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload,
});

const setQuery = (payload: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload,
});

const clearQuery = (): ClearQueryAction => ({ type: 'filter/CLEAR' });

export const actions = { setStatus, setQuery, clearQuery };

type State = {
  query: string;
  status: Filter;
};

const initialState = { query: '', status: Filter.All };

type Action = SetStatusAction | SetQueryAction | ClearQueryAction;

const filterReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };

    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };

    case 'filter/CLEAR':
      return { ...state, query: '' };

    default:
      return state;
  }
};

export default filterReducer;
