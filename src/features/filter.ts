import { Status } from '../types/Status';

type Filter = {
  query: string;
  status: Status;
};

type SetFilter = {
  type: 'filters/SET';
  payload: Filter;
};

const setFilters = (filter: Filter): SetFilter => ({
  type: 'filters/SET',
  payload: filter,
});

export const actions = {
  setFilters,
};

type State = Filter;
type Action = SetFilter;

const defaultState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case 'filters/SET':
      return action.payload;

    default:
      return state;
  }
};

export default filterReducer;
