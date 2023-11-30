import { Filter } from '../types/Filter';

type SetStatusAction = {
  type: 'filter/SETSTATUS',
  payload: Filter,
};

type SetQueryAction = {
  type: 'filter/SETQUERY',
  payload: string,
};

type ClearQueryAction = {
  type: 'filter/CLEAR',
};

type Action = SetStatusAction | SetQueryAction | ClearQueryAction;

const setStatus = (value: Filter): SetStatusAction => ({
  type: 'filter/SETSTATUS',
  payload: value,
});

const setQuery = (value: string): SetQueryAction => ({
  type: 'filter/SETQUERY',
  payload: value,
});

const clearQuery = (): ClearQueryAction => ({
  type: 'filter/CLEAR',
});

export const actions = { setStatus, setQuery, clearQuery };

type State = {
  query: string,
  status : Filter,
};

const initialState: State = {
  query: '',
  status: Filter.All,
};

const filterReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/SETSTATUS':
      return { ...state, status: action.payload };
    case 'filter/SETQUERY':
      return { ...state, query: action.payload };
    case 'filter/CLEAR':
      return { ...state, query: '' };
    default:
      return state;
  }
};

export default filterReducer;
