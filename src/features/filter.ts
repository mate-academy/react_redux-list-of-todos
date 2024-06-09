import { Status } from '../types/Status';

const SET_FILTER = 'filter/SET';
const SET_QUERY = 'query/SET';

type State = {
  query: string;
  filter: Status;
};

type SetFilterAction = {
  type: typeof SET_FILTER;
  payload: Status;
};

type SetQueryAction = {
  type: typeof SET_QUERY;
  payload: string;
};

const setFilter = (filter: Status): SetFilterAction => ({
  type: SET_FILTER,
  payload: filter,
});

const setQuery = (query: string): SetQueryAction => ({
  type: SET_QUERY,
  payload: query,
});

export const actions = { setFilter, setQuery };

type Actions = SetFilterAction | SetQueryAction;

const filterReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: State = {
    query: '',
    filter: 'all',
  },
  action: Actions,
) => {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    case SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
