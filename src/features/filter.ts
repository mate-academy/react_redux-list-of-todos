import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

type SetStatusAction = {
  type: 'filter/SET_STATUS';
  payload: Status;
};

type SetClearAction = {
  type: 'filter/SET_CLEAR';
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

const clearFilter = (): SetClearAction => ({
  type: 'filter/SET_CLEAR',
});

export const actions = { setQuery, setStatus, clearFilter };

export interface FilterState {
  query: string;
  status: Status;
}

const initialState: FilterState = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: FilterState = initialState,
  action: SetQueryAction | SetStatusAction | SetClearAction,
): FilterState => {
  switch (action.type) {
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

    case 'filter/SET_CLEAR':
      return {
        ...state,
        query: '',
      };

    default:
      return state;
  }
};

export default filterReducer;
