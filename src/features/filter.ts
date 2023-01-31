import { Status } from '../types/Status';

type SetStatusAction = {
  type: 'filter/SET_STATUS',
  payload: Status,
};

type SetQueryAction = {
  type: 'filter/SET_QUERY',
  payload: string,
};

const setQueryAction = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setStatusAction = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

const initialState = {
  query: '',
  status: Status.ALL,
};

type Action = SetStatusAction | SetQueryAction;

export const actions = { setStatusAction, setQueryAction };

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };

    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
