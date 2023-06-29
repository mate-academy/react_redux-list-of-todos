import { FilterType } from '../types/FilterType';

type SetQueryAction = { type: 'filter/SET_QUERY', payload: string };
type SetStatusAction = { type: 'filter/SET_STATUS', payload: FilterType };
type SetClearAction = { type: 'filter/SET_CLEAR' };

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});
const setStatus = (status: FilterType): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});
const clearFilter = (): SetClearAction => ({
  type: 'filter/SET_CLEAR',
});

type Action = SetQueryAction | SetStatusAction | SetClearAction;
type State = { query: string, status: FilterType };

const filterInitial: State = {
  query: '',
  status: FilterType.ALL,
};

const filterReducer = (state = filterInitial, action: Action): State => {
  switch (action.type) {
    case 'filter/SET_CLEAR':
      return {
        ...state,
        query: '',
      };
    case 'filter/SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };
    case 'filter/SET_STATUS':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
export const actions = { setQuery, setStatus, setClear: clearFilter };
