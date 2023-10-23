import { Status } from '../types/Status';

type SetFilterStatus = {
  type: 'filter/SET_STATUS',
  payload: Status,
};

type SetFilterQuery = {
  type: 'filter/SET_QUERY',
  payload: string,
};

type Action = SetFilterStatus | SetFilterQuery;

export interface FilterState {
  query: string,
  status: Status,
}

const setFilter = (value: Status) => ({
  type: 'filter/SET_STATUS',
  payload: value,
});

const setQuery = (value: string) => ({
  type: 'filter/SET_QUERY',
  payload: value,
});

export const actions = { setFilter, setQuery };

const initialState: FilterState = {
  query: '',
  status: Status.All,
};

const filterReducer = (
  state: FilterState = initialState,
  action: Action,
): FilterState => {
  switch (action.type) {
    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };

    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
