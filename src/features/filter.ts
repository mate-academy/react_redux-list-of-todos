import { Status } from '../types/Status';

type SetStatusAction = {
  type: 'filter/SET_STATUS',
  payload: Status,
};

type QueryAction = {
  type: 'filter/SET_QUERY',
  payload: string,
};

type ClearAction = {
  type: 'filter/CLEAR'
};

const setStatus = (payload: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload,
});

const setSearch = (payload: string): QueryAction => ({
  type: 'filter/SET_QUERY',
  payload,
});

const clear = (): ClearAction => ({ type: 'filter/CLEAR' });

export const actions = { setStatus, setSearch, clear };

type State = {
  query: string,
  status: string,
};

type Action = SetStatusAction | QueryAction | ClearAction;

const initialState = { query: '', status: 'all' };

const filterReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };

    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };

    case 'filter/CLEAR':
      return { ...state, query: '' };

    default:
      return state;
  }
};

export default filterReducer;
