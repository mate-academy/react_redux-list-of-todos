import { FilterStatus } from '../types/FilterStatus';
import { FilterType } from '../types/FilterType';

type AddAction = {
  type: 'filter/SET';
  payload: FilterType;
};

type Action = AddAction;

const set = (filter: FilterType): AddAction => ({
  type: 'filter/SET',
  payload: filter,
});

export const actions = { set };

const initialFilter = {
  query: '',
  status: FilterStatus.All,
};

const filterReducer = (filter: FilterType = initialFilter, action: Action) => {
  switch (action.type) {
    case 'filter/SET':
      return {
        query: action.payload.query,
        status: action.payload.status,
      };

    default:
      return filter;
  }
};

export default filterReducer;
