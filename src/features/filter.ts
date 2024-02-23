import { Filters } from '../types';

const SET_QUERY = 'filter/SET_QUERY';
const RESET_QUERY = 'filter/RESET_QUERY';
const SET_STATUS = 'filter/SET_STATUS';

type FilterState = {
  query: string;
  status: Filters;
};

type SetQueryAction = {
  type: typeof SET_QUERY;
  payload: FilterState['query'];
};

type ResetQueryAction = {
  type: typeof RESET_QUERY;
};

type SetStatusAction = {
  type: typeof SET_STATUS;
  payload: FilterState['status'];
};

const initialState: FilterState = {
  query: '',
  status: Filters.ALL,
};

const setQuery = (query: FilterState['query']): SetQueryAction => ({
  type: SET_QUERY,
  payload: query,
});

const resetQuery = (): ResetQueryAction => ({
  type: RESET_QUERY,
});

const setStatus = (status: FilterState['status']): SetStatusAction => ({
  type: SET_STATUS,
  payload: status,
});

type Actions = SetQueryAction | ResetQueryAction | SetStatusAction;

export const actions = {
  setQuery,
  resetQuery,
  setStatus,
};

const filterReducer = (
  state: FilterState = initialState,
  action: Actions,
): FilterState => {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    case RESET_QUERY:
      return {
        ...state,
        query: '',
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
