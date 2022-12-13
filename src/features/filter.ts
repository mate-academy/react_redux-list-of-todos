import { Status } from '../types/Status';

type SetStatusAction = { type: 'filterStatus/SET', payload: Status };
type SetQueryAction = { type: 'filterQuery/SET', payload: string };
type ClearQueryAction = { type: 'filterQuery/CLEAR' };

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filterStatus/SET',
  payload: status,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'filterQuery/SET',
  payload: query,
});

const clearQuery = (): ClearQueryAction => ({
  type: 'filterQuery/CLEAR',
});

export const actions = { setStatus, setQuery, clearQuery };

type Action = SetStatusAction | SetQueryAction | ClearQueryAction;
type State = {
  query: string,
  status: Status,
};

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'filterStatus/SET':
      return {
        ...state,
        status: action.payload,
      };
    case 'filterQuery/SET':
      return {
        ...state,
        query: action.payload,
      };
    case 'filterQuery/CLEAR':
      return {
        ...state,
        query: '',
      };
    default:
      return state;
  }
};

export default filterReducer;
