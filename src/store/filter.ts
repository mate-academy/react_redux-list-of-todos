import { FilterType } from '../types/FilterType';

type SetStatusAction = {
  type: 'filter/SET_STATUS';
  payload: string;
};

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

type Action = SetStatusAction | SetQueryAction;

type State = {
  status: string;
  query: string;
};

const initialState: State = {
  status: FilterType.ALL,
  query: '',
};

export const actions = {
  setStatus: (status: string): SetStatusAction => ({
    type: 'filter/SET_STATUS',
    payload: status,
  }),
  setQuery: (query: string): SetQueryAction => ({
    type: 'filter/SET_QUERY',
    payload: query,
  }),
};

export const filterReducer = (state = initialState, action: Action): State => {
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
    default:
      return state;
  }
};
