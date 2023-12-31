import { Filter } from '../types/Filter';

type SetQueryAction = {
  type: 'filter/SET_QUERY',
  payload: Filter['query'],
};
type SetStatusAction = {
  type: 'filter/SET_STATUS',
  payload: Filter['status'],
};
type Action = SetQueryAction | SetStatusAction;
type State = Filter;

export const actions = {
  setQuery(
    query: Filter['query'],
  ): SetQueryAction {
    return {
      type: 'filter/SET_QUERY',
      payload: query,
    };
  },

  setStatus(
    status: Filter['status'],
  ): SetStatusAction {
    return {
      type: 'filter/SET_STATUS',
      payload: status,
    };
  },
};

const filterReducer = (
  state: State = {
    query: '',
    status: 'all',
  },
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/SET_QUERY': {
      return {
        ...state,
        query: action.payload,
      };
    }

    case 'filter/SET_STATUS': {
      return {
        ...state,
        status: action.payload,
      };
    }

    default:
      return state;
  }
};

export default filterReducer;
