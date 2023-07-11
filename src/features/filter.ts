import {
  Actions,
  FilterState,
  QueryAction,
} from '../types/Status';

const intialState: FilterState = {
  query: '',
  status: 'all',
};

const setQuery = (query: string): QueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const clearQuery = () => ({
  type: 'filter/CLEAR_QUERY',
});

const setStatus = (status: string) => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

export const actions = {
  setQuery,
  clearQuery,
  setStatus,
};

const filterReducer = (state = intialState, action: Actions): FilterState => {
  switch (action.type) {
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
