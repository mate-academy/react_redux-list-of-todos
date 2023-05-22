import {
  Action,
  Filter,
  FilterActive,
  FilterAll,
  FilterCompleted,
  QueryFilter,
} from '../types/types';

const initialFilter: Filter = {
  query: '',
  status: 'all',
};

const setQuery = (value: string): QueryFilter => ({
  type: 'filter/QUERY',
  payload: value,
});

const all = (): FilterAll => ({ type: 'filter/ALL', payload: 'all' });
const active = (): FilterActive => ({
  type: 'filter/ACTIVE',
  payload: 'active',
});
const completed = (): FilterCompleted => ({
  type: 'filter/COMPLETED',
  payload: 'completed',
});

export const actions = {
  all,
  active,
  completed,
  setQuery,
};

const filterReducer = (
  state: Filter = initialFilter,
  action: Action,
): Filter => {
  switch (action.type) {
    case 'filter/ACTIVE':
      return {
        ...state,
        status: action.payload,
      };

    case 'filter/ALL':
      return {
        ...state,
        status: action.payload,
      };

    case 'filter/COMPLETED':
      return {
        ...state,
        status: action.payload,
      };

    case 'filter/QUERY':
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
