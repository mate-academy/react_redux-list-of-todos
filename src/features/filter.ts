import { Status } from '../types/Status';

type SetQueryAction = { type: 'filter/SET_QUERY', payload: string };
type SetStatusAction = { type: 'filter/SET_STATUS', payload: Status };

const setQuery = (value: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: value,
});

const setStatus = (value: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: value,
});

type Action = SetQueryAction | SetStatusAction;

type State = { query: string, status: Status };
const initialState: State = { query: '', status: 'all' };

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
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
      return {
        ...state,
      };
  }
};

export const actions = { setQuery, setStatus };

export default filterReducer;
