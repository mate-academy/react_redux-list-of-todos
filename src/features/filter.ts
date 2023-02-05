import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'filter/SET_QUERY',
  payload: string,
};

type SetStatusAction = {
  type: 'filter/SET_STATUS',
  payload: Status,
};

type Action = SetQueryAction | SetStatusAction;

type FilterState = {
  query: string,
  status: Status
};

export const actions = {
  setQuery: (payload: string): SetQueryAction => ({
    type: 'filter/SET_QUERY',
    payload,
  }),
  setStatus: (payload: Status): SetStatusAction => ({
    type: 'filter/SET_STATUS',
    payload,
  }),
};

const initialState: FilterState = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: FilterState = initialState,
  action: Action,
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

    default:
      return state;
  }
};

export default filterReducer;
