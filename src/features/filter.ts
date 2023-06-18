import { FilterType } from '../types/Status';

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

const setClear = (): SetClearAction => ({
  type: 'filter/SET_CLEAR',
});

export const actions = { setClear, setQuery, setStatus };

type Action = SetClearAction | SetQueryAction | SetStatusAction;
type State = { query: string, status: FilterType };

const filterInitial: State = {
  query: '',
  status: FilterType.ALL,
};

const filterReducer = (state = filterInitial, actoin: Action): State => {
  switch (actoin.type) {
    case 'filter/SET_CLEAR':
      return {
        ...state,
        query: '',
      };
    case 'filter/SET_QUERY':
      return {
        ...state,
        query: actoin.payload,
      };
    case 'filter/SET_STATUS':
      return {
        ...state,
        status: actoin.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
