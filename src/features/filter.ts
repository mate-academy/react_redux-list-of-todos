import { Filter } from '../types/Filter';

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

type SetStatusAction = {
  type: 'filter/SET_STATUS';
  payload: Filter;
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setStatus = (status: Filter): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

export const actions = { setQuery, setStatus };

type State = { query: string, status: Filter };
type Action = SetQueryAction | SetStatusAction;

const initialState = { query: '', status: 'all' as Filter };

const filterReducer = (
  state: State = initialState,
  action: Action,

): State => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { query: action.payload, status: state.status };

    case 'filter/SET_STATUS':
      return { query: state.query, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
