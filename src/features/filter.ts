import { Status } from '../types/Status';

type SetStatusAction = {
  type: 'filter/SET_STATUS';
  payload: Status;
};

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

const setFilterStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

export const actions = { setFilterStatus, setQuery };

type State = {
  query: string;
  status: Status;
};

type Action = SetStatusAction | SetQueryAction;

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (state: State = initialState, action: Action) => {
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
