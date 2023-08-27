import { Filters } from '../types/Filters';
import { Status } from '../types/Status';

type SetFiltersAction = {
  type: 'filters/SET',
  payload: Filters,
};

type ClearQueryAction = {
  type: 'filters/CLEARQUERY',
};

const setFilters = (filters: Filters) => ({
  type: 'filters/SET',
  payload: filters,
});

const clearQuery = () => ({
  type: 'filters/CLEARQUERY',
});

export const actions = { setFilters, clearQuery };

type State = Filters;
type Action = SetFiltersAction | ClearQueryAction;

const initialState: State = {
  query: '',
  status: Status.All,
};

const filterReducer = (
  state: State = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'filters/SET':
      return {
        ...state,
        ...action.payload,
      };
    case 'filters/CLEARQUERY':
      return {
        ...state,
        query: '',
      };
    default:
      return state;
  }
};

export default filterReducer;
