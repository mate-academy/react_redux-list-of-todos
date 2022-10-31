import { Select } from '../types/Select';

type FilterSelectAction = { type: 'filter/Select', payload: Select };
type FilterInputAction = { type: 'filter/Input', payload: string };

type Action = FilterSelectAction | FilterInputAction;

const setFilterSelect = (filter: Select): FilterSelectAction => (
  { type: 'filter/Select', payload: filter }
);

const setFilterInput = (filter: string): FilterInputAction => (
  { type: 'filter/Input', payload: filter }
);

const defaultFilter = { query: '', status: Select.All };

const filterReducer = (filter = defaultFilter, action: Action) => {
  switch (action.type) {
    case 'filter/Select':
      return { ...filter, status: action.payload };

    case 'filter/Input':
      return { ...filter, query: action.payload };

    default:
      return filter;
  }
};

export const actions = { setFilterSelect, setFilterInput };

export default filterReducer;
