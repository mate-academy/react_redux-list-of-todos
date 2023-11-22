import { FilterParams } from '../types/FilterParams';
import { FilterStatusValues } from '../types/FilterStatusValues';

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
      return { ...params, status: FilterStatusValues.All };

    case 'filter/ACTIVE':
      return { ...params, status: FilterStatusValues.Active };

    case 'filter/COMPLETED':
      return { ...params, status: FilterStatusValues.Completed };

    case 'filter/SETQUERY':
      return { ...params, query: action.payload };

    default:
      return params;
  }
};

export default filterReducer;
