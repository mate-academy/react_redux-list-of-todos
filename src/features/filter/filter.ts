import { Action, State } from './types';

const initialState: State = {
  status: 'all',
  query: '',
};

const filterReducer = (
  filters: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/Status':
      return {
        ...filters, status: action.payload,
      };
    case 'filter/Query':
      return {
        ...filters, query: action.payload,
      };
    default:
      return filters;
  }
};

export default filterReducer;
