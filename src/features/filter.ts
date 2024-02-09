import { Status } from '../types/Status';

type SetFilterAction = {
  type: 'filter/SET',
  payload: Status,
};

type SetQueryAction = {
  type: 'query/SET',
  payload: string,
};

const setFilter = (status: Status): SetFilterAction => ({
  type: 'filter/SET',
  payload: status,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'query/SET',
  payload: query,
});

const initialState = {
  status: Status.All,
  query: '',
};

type Action = SetFilterAction | SetQueryAction;

export const actions = { setFilter, setQuery };

const filterReducer = (
  state = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'filter/SET':
      return {
        ...state,
        status: action.payload,
      };
    case 'query/SET':
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
