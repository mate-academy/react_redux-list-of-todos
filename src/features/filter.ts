import { Status } from '../types/Status';

const initialState: FilterState = {
  query: '',
  status: 'all',
};

type FilterState = {
  query: string,
  status: Status,
};

type SetQueryAction = {
  type: 'filter/SET_QUERY',
  payload: string
};

type SetStatusAction = {
  type: 'filter/SET_STATUS',
  payload: Status,
};

type Action = SetQueryAction | SetStatusAction;

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

export const actions = { setQuery, setStatus };

const filterReducer = (
  state = initialState,
  action: Action,
): FilterState => {
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
