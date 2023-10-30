import { Status } from '../types/Status';

type State = {
  query: string;
  status: Status;
};

type SetStatusAction = {
  type: 'filters/SET_STATUS';
  payload: Status;
};

type SetQueryAction = {
  type: 'filters/SET_QUERY';
  payload: string;
};

type ClearQueryAction = {
  type: 'filters/CLEAR_QUERY';
};

type Actions = SetQueryAction | SetStatusAction | ClearQueryAction;

const setQuery = (query: string): SetQueryAction => ({
  type: 'filters/SET_QUERY',
  payload: query,
});

const clearQuery = (): ClearQueryAction => ({
  type: 'filters/CLEAR_QUERY',
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filters/SET_STATUS',
  payload: status,
});

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case 'filters/SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };

    case 'filters/SET_STATUS':
      return {
        ...state,
        status: action.payload,
      };

    case 'filters/CLEAR_QUERY':
      return {
        ...state,
        query: '',
      };

    default:
      return state;
  }
};

export const actions = {
  setQuery,
  setStatus,
  clearQuery,
};
export default filterReducer;
