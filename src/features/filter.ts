import { FilterParams } from '../types/FilterParams';
import { FilterStatus } from '../types/FilterStatus';

type FilterAllAction = { type: 'filter/ALL' };
type FilterActiveAction = { type: 'filter/ACTIVE' };
type FilterCompletedAction = { type: 'filter/COMPLETED' };
type FilterSetQueryAction = { type: 'filter/SETQUERY', payload: string };
type Action = FilterAllAction
| FilterActiveAction
| FilterCompletedAction
| FilterSetQueryAction;

const initialParams: FilterParams = {
  query: '',
  status: 'all',
};

const setFilterAll = (): FilterAllAction => {
  return { type: 'filter/ALL' };
};

const setFilterActive = (): FilterActiveAction => {
  return { type: 'filter/ACTIVE' };
};

const setFilterCompleted = (): FilterCompletedAction => {
  return { type: 'filter/COMPLETED' };
};

const setFilterQuery = (query: string):FilterSetQueryAction => {
  return { type: 'filter/SETQUERY', payload: query };
};

export const actions = {
  setFilterAll,
  setFilterActive,
  setFilterCompleted,
  setFilterQuery,
};

const filterReducer = (
  params: FilterParams = initialParams,
  action: Action,
): FilterParams => {
  switch (action.type) {
    case 'filter/ALL':
      return { ...params, status: FilterStatus.ALL };

    case 'filter/ACTIVE':
      return { ...params, status: FilterStatus.ACTIVE };

    case 'filter/COMPLETED':
      return { ...params, status: FilterStatus.COMPLETED };

    case 'filter/SETQUERY':
      return { ...params, query: action.payload };

    default:
      return params;
  }
};

export default filterReducer;
