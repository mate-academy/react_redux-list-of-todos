import { Status } from '../types/Status';

type SetQueryAction = { type: 'filter/SET_QUERY', payload: string };
type SetFilterAction = { type: 'filter/SET_FILTER', payload: Status };

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setFilter = (status: Status): SetFilterAction => ({
  type: 'filter/SET_FILTER',
  payload: status,
});

type Action = SetQueryAction | SetFilterAction;

export const actions = { setQuery, setFilter };

type State = {
  query: string,
  filter: Status,
};

const initialState: State = {
  query: '',
  filter: Status.All,
};

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/SET_FILTER': {
      return {
        ...state,
        filter: action.payload,
      };
    }

    default:
      return state;
  }
};

export default filterReducer;
