import { RootState } from '../app/store';
import { Filter } from '../types/Filter';

type SetStatusAction = { type: 'filter/SET_STATUS'; payload: Filter };
type SetQueryAction = { type: 'filter/SET_QUERY'; payload: string };
type Action = SetStatusAction | SetQueryAction;

type State = {
  query: string;
  status: Filter;
};

export const actions = {
  setStatus: (status: Filter): SetStatusAction => ({
    payload: status,
    type: 'filter/SET_STATUS',
  }),
  setQuery: (query: string): SetQueryAction => ({
    payload: query,
    type: 'filter/SET_QUERY',
  }),
};

const initialState: State = {
  query: '',
  status: Filter.All,
};
// eslint-disable-next-line @typescript-eslint/default-param-last
const filterReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };

    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export const filterSelector = (state: RootState) => state.filter;

export default filterReducer;
