import { Status } from '../types/Status';

type SetFilterAction = {
  type: 'filter/SET';
  payload: Status;
};

type SetQueryAction = {
  type: 'query/SET';
  payload: string;
};

type ClearQueryAction = {
  type: 'query/CLEAR';
};

const setFilter = (status: Status): SetFilterAction => ({
  type: 'filter/SET',
  payload: status,
});

const setQuery = (str: string): SetQueryAction => ({
  type: 'query/SET',
  payload: str,
});

const clearQuery = (): ClearQueryAction => ({
  type: 'query/CLEAR',
});

export const actions = { setFilter, setQuery, clearQuery };

type State = { filter: Status; query: string };

const initialState: State = { filter: 'all', query: '' };

type Action = SetFilterAction | SetQueryAction | ClearQueryAction;

const filterReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/SET':
      return { ...state, filter: action.payload };
    case 'query/SET':
      return { ...state, query: action.payload };
    case 'query/CLEAR':
      return { ...state, query: '' };
    default:
      return state;
  }
};

export default filterReducer;
