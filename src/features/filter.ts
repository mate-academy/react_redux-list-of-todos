import { FilterTypes } from '../types/FilterTypes';
import { FilterActionTypes } from '../types/FilterActionTypes';

type SetQueryAction = { type: FilterActionTypes.SET_QUERY, payload: string };
type SetStatusAction = {
  type: FilterActionTypes.SET_STATUS,
  payload: FilterTypes,
};
type SetClearAction = { type: FilterActionTypes.SET_CLEAR };

const setQuery = (query: string): SetQueryAction => ({
  type: FilterActionTypes.SET_QUERY,
  payload: query,
});
const setStatus = (status: FilterTypes): SetStatusAction => ({
  type: FilterActionTypes.SET_STATUS,
  payload: status,
});
const clearFilter = (): SetClearAction => ({
  type: FilterActionTypes.SET_CLEAR,
});

type Action = SetQueryAction | SetStatusAction | SetClearAction;
type State = { query: string, status: FilterTypes };

const filterInitial: State = {
  query: '',
  status: FilterTypes.ALL,
};

const filterReducer = (state = filterInitial, action: Action): State => {
  switch (action.type) {
    case FilterActionTypes.SET_CLEAR:
      return {
        ...state,
        query: '',
      };
    case FilterActionTypes.SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    case FilterActionTypes.SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
export const actions = { setQuery, setStatus, clearFilter };
