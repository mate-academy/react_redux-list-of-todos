import { FilterState } from '../types/FilterState';
import { Status } from '../types/Status';

type SetFilterAction = { type: 'filter/SET', payload: Status };
type SetQueryAction = { type: 'query/ADD', payload: string };

const setFilter = (value: Status):SetFilterAction => {
  return {
    type: 'filter/SET',
    payload: value,
  };
};

const setQuery = (value: string):SetQueryAction => {
  return {
    type: 'query/ADD',
    payload: value,
  };
};

const initialState: FilterState = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: FilterState = initialState,
  action: SetFilterAction | SetQueryAction,
) => {
  switch (action.type) {
    case 'filter/SET':
      return {
        ...state,
        status: action.payload,
      };

    case 'query/ADD':
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
};

export const actions = { setFilter, setQuery };
export default filterReducer;
