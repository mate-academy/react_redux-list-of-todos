import { Filter } from '../enums/Filter';

type SetStatusAction = {
  type: 'filter/SET_STATUS',
  payload: Filter,
};

type QueryAction = {
  type: 'filter/SET_QUERY',
  payload: string,
};

type ClearAction = {
  type: 'filter/CLEAR'
};

const setStatus = (payload: Filter): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload,
});

const setQuery = (payload: string): QueryAction => ({
  type: 'filter/SET_QUERY',
  payload,
});

const clear = (): ClearAction => ({ type: 'filter/CLEAR' });

export const actions = { setStatus, setQuery, clear };

type State = {
  query: string;
  status: Filter;
};

const initialState = { query: '', status: Filter.All };

type Action = SetStatusAction | QueryAction | ClearAction;

const filterReducer = (state: State = initialState, action: Action) => {
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
