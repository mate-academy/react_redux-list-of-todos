import { FilterType } from '../types/FilterType';

type SetFilterType = {
  type: 'filter/SET_FILTERTYPE';
  payload: string;
};

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string,
};

type SetAppliedQueryAction = {
  type: 'filter/SET_APPLIEDQUERY';
  payload: string,
};

type Action = SetFilterType | SetQueryAction | SetAppliedQueryAction;

type FilterState = {
  filterType: string,
  query: string,
  appliedQuery: string,
};

const initialState: FilterState = {
  filterType: FilterType.All,
  query: '',
  appliedQuery: '',
};

export const actions = {
  setFilterType: (filterType: string): SetFilterType => ({
    type: 'filter/SET_FILTERTYPE',
    payload: filterType,
  }),
  setQuery: (query: string): SetQueryAction => ({
    type: 'filter/SET_QUERY',
    payload: query,
  }),
  setAppliedQuery: (query: string): SetAppliedQueryAction => ({
    type: 'filter/SET_APPLIEDQUERY',
    payload: query,
  }),
};

const filterReducer = (
  state = initialState,
  action: Action,
): FilterState => {
  switch (action.type) {
    case 'filter/SET_FILTERTYPE':
      return {
        ...state,
        filterType: action.payload,
      };

    case 'filter/SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/SET_APPLIEDQUERY':
      return {
        ...state,
        appliedQuery: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
