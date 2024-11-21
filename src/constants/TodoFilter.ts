import { FilterStatuses } from '../utils/enums/FiltersStatus';

export const TODO_FILTER_OPTIONS = [
  { value: 'all', title: 'All', id: 1 },
  { value: 'active', title: 'Active', id: 2 },
  { value: 'completed', title: 'Completed', id: 3 },
];

export const DEFAULT_FILTER_STATE = {
  status: FilterStatuses.All,
  filter: '',
};
