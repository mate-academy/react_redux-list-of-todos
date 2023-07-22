import { SortType } from '../types/SortType';

type SetQueryAction = {
  type: 'query/SET_QUERY',
  payload: string,
};

type SetStatusAction = {
  type: 'status/SET_STATUS',
  payload: SortType,
};

type SetClearAction = {
  type: 'status/SET_CLEAR',
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'query/SET_QUERY',
  payload: query,
});

const setStatus = (status: SortType): SetStatusAction => ({
  type: 'status/SET_STATUS',
  payload: status,
});

const setClear = (): SetClearAction => ({
  type: 'status/SET_CLEAR',
});

export const actions = { setQuery, setStatus, setClear };

type Action = SetQueryAction | SetStatusAction | SetClearAction;

interface FilterState {
  query: string;
  status: SortType;
}

const initialState: FilterState = {
  query: '',
  status: SortType.ALL,
};

const filterReducer = (state: FilterState = initialState, action: Action) => {
  switch (action.type) {
    case 'query/SET_QUERY':
      return { ...state, query: action.payload };

    case 'status/SET_STATUS':
      return { ...state, status: action.payload };

    case 'status/SET_CLEAR':
      return { ...state, query: '' };

    default:
      return state;
  }
};

export default filterReducer;
