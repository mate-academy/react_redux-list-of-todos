import { Status } from '../types/Status';

type SetFilterAction = {
  type: 'filter/SET_STATUS';
  payload: Status;
};

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

const setFilter = (filter: Status): SetFilterAction => ({
  type: 'filter/SET_STATUS',
  payload: filter,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

export const actions = { setFilter, setQuery };

type State = { filter: Status, query: string };
type Action = SetFilterAction | SetQueryAction;

const initialState: State = {
  query: '',
  filter: 'all',
};

const filterReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/SET_STATUS':
      return { ...state, filter: action.payload };
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
