import { Action, State } from './types';
import { FILTER_QUERY, FILTER_STATUS } from '../../types/types';
import { Status } from '../../types/Status';

const initialState: State = {
  status: Status.ALL,
  query: '',
};

const filterReducer = (
  filters: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case FILTER_STATUS:
      return {
        ...filters, status: action.payload,
      };
    case FILTER_QUERY:
      return {
        ...filters, query: action.payload,
      };
    default:
      return filters;
  }
};

export default filterReducer;
