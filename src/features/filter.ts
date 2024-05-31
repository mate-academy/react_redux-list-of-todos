import { Status } from '../types/Status';

type SetQueryAction = { type: 'filter/SET_QUERY'; payload: string };

type SetStatusAction = { type: 'filter/SET_STATUS'; payload: Status };

type Action = SetQueryAction | SetStatusAction;

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

const initialState = { query: '', status: 'all' };

/* eslint-disable @typescript-eslint/default-param-last */
const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };

    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };
  }

  return state;
};

export const actions = { setQuery, setStatus };

export default filterReducer;
