import { FilterStatus } from '../types/enums/FilterStatus';

enum ReducerType {
  SET_QUERY = 'filter/SET_QUERY',
  SET_FILTER = 'filter/SET_FILTER',
}

interface State {
  status: FilterStatus,
  query: string,
}

const initialState = {
  status: FilterStatus.ALL,
  query: '',
};

type Action = { type: ReducerType.SET_FILTER, payload: FilterStatus }
| { type: ReducerType.SET_QUERY, payload: string };

const filterReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ReducerType.SET_FILTER:
      return {
        ...state,
        status: action.payload,
      };

    case ReducerType.SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
};

export const actions = {
  setQuery: (payload: string) => ({ type: ReducerType.SET_QUERY, payload }),
  setFilter: (payload: FilterStatus) => ({
    type: ReducerType.SET_FILTER,
    payload,
  }),
};

export default filterReducer;
