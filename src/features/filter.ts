import { Select } from '../types/Select';
import { Filter } from '../types/Filter';

type FilterSelectAction = { type: Filter.SELECT, payload: Select };
type FilterInputAction = { type: Filter.INPUT, payload: string };

type Action = FilterSelectAction | FilterInputAction;

const setFilterSelect = (filter: Select): FilterSelectAction => (
  { type: Filter.SELECT, payload: filter }
);

const setFilterInput = (filter: string): FilterInputAction => (
  { type: Filter.INPUT, payload: filter }
);

const defaultFilter = { query: '', status: Select.All };

const filterReducer = (filter = defaultFilter, action: Action) => {
  switch (action.type) {
    case Filter.SELECT:
      return { ...filter, status: action.payload };

    case Filter.INPUT:
      return { ...filter, query: action.payload };

    default:
      return filter;
  }
};

export const actions = { setFilterSelect, setFilterInput };

export default filterReducer;
