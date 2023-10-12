import { FilterActionTypes, FilterStatus } from '../enums';
import { FilterPayload, FilterAction } from '../types/Filter';

export const setCategory = (status: FilterStatus) => ({
  type: FilterActionTypes.SET_CATEGORY_FILTER,
  payload: status,
});

export const setQuery = (query: string) => ({
  type: FilterActionTypes.SET_QUERY_FILTER,
  payload: query,
});

export const clearQuery = () => ({
  type: FilterActionTypes.CLEAR_QUERY_FILTER,
  payload: '',
});

export const actions = { setCategory, setQuery, clearQuery };

const initialState: FilterPayload = {
  query: '',
  status: FilterStatus.ALL,
};

const filterReducer = (
  state = initialState,
  action: FilterAction,
): FilterPayload => {
  switch (action.type) {
    case FilterActionTypes.SET_CATEGORY_FILTER:
      return { ...state, status: action.payload };
    case FilterActionTypes.SET_QUERY_FILTER:
      return { ...state, query: action.payload };
    case FilterActionTypes.CLEAR_QUERY_FILTER:
      return { ...state, query: '' };
    default:
      return { ...state };
  }
};

export default filterReducer;
