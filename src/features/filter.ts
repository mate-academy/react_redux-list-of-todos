import { FilterStatus } from '../types/FilterStatus';

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

type SetStatusAction = {
  type: 'filter/SET_STATUS';
  payload: FilterStatus;
};

type SetClearAction = {
  type: 'filter/SET_CLEAR';
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setStatus = (status: FilterStatus): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

const setClear = (): SetClearAction => ({
  type: 'filter/SET_CLEAR',
});

export const actions = {
  setQuery,
  setStatus,
  setClear,
};

type State = {
  query: string;
  status: FilterStatus;
};

type Action = SetQueryAction | SetStatusAction | SetClearAction;

const initialState = {
  query: '',
  status: FilterStatus.ALL,
};

const filterReducer = (state: State = initialState, action: Action) => {
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
