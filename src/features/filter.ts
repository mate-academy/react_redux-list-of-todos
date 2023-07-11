import {
  Actions,
  FilterActions,
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
    case FilterActions.SetQuery:
      return {
        ...state,
        query: action.payload,
      };

    case FilterActions.ClearQuery:
      return {
        ...state,
        query: '',
      };

    case FilterActions.SetStatus:
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
