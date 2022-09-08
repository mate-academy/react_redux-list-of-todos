import { combineReducers } from 'redux';

export enum FilterType {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type SetFilterType = {
  type: 'filter/SET_FILTERTYPE';
  payload: string;
};

type SetAppliedQueryAction = {
  type: 'filter/SET_APPLIEDQUERY';
  payload: string,
};

// type setFilteredList = {
//   type: 'filter/SET_FILTEREDLIST',
// };

type Action = SetFilterType | SetAppliedQueryAction;

type FilterState = {
  filterType: string,
  appliedQuery: string,
};

const initialState: FilterState = {
  filterType: FilterType.All,
  appliedQuery: '',
};

export const actions = {
  setFilterType: (filterType: string): SetFilterType => ({
    type: 'filter/SET_FILTERTYPE',
    payload: filterType,
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

    case 'filter/SET_APPLIEDQUERY':
      return {
        ...state,
        appliedQuery: action.payload,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  filter: filterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const getFilterQuerySelector = (state: RootState) => state.filter.appliedQuery;
const getFilterTypeSelector = (state: RootState) => state.filter.filterType;

export const FilterSelector = {
  getFilterQuery: getFilterQuerySelector,
  getFilterType: getFilterTypeSelector,
};

export default filterReducer;
