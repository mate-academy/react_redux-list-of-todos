import { Status } from '../types/Status';

type State = {
  query: string;
  status: Status;
};

const initialState: State = {
  query: '',
  status: 'all',
};

type SetStatusAction = {
  type: 'filter/SET_STATUS';
  payload: Status;
};

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

type ClearQueryAction = {
  type: 'filter/CLEAR_QUERY';
  payload: string;
};

type Action = SetQueryAction | SetStatusAction | ClearQueryAction;

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const clearQuery = (): ClearQueryAction => ({
  type: 'filter/CLEAR_QUERY',
  payload: '',
});

export const actions = {
  setStatus,
  setQuery,
  clearQuery,
};

const filterReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/SET_STATUS':
      return {
        ...state,
        status: action.payload,
      };

    case 'filter/SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/CLEAR_QUERY':
      return {
        ...state,
        query: '',
      };

    default:
      return {
        ...state,
      };
  }
};

export default filterReducer;
