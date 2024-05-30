import { Filter } from '../types/Filter';

const FilterType = 'filter/FilterType';
const FilterQuery = 'filter/FilterQuery';

type FilterTypeAction = { type: typeof FilterType; payload: Filter };
type FilterQueryAction = { type: typeof FilterQuery; payload: string };

type Action = FilterTypeAction | FilterQueryAction;

const filterType = (filter: Filter): FilterTypeAction => ({
  type: FilterType,
  payload: filter,
});

const filterQuery = (query: string): FilterQueryAction => ({
  type: FilterQuery,
  payload: query,
});

export const actions = { filterType, filterQuery };

type FilterState = {
  filterType: Filter;
  filterQuery: string;
};

const initialState: FilterState = {
  filterType: Filter.All,
  filterQuery: '',
};

const filterReducer = (
  state: FilterState = initialState, action: Action
): FilterState => {
  switch (action.type) {
    case FilterType:
      return {
        ...state,
        filterType: action.payload,
      };
    case FilterQuery:
      return {
        ...state,
        filterQuery: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
