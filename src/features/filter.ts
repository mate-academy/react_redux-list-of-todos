/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */

const SET_QUERY = 'SetQuery';
const SET_STATUS = 'SetStatus';

type SetTodoQuery = {
  type: typeof SET_QUERY;
  payload: string;
};

type SetTodoStatus = {
  type: typeof SET_STATUS;
  payload: string;
};

const setStatus = (status : string): SetTodoStatus => ({
  type: SET_STATUS,
  payload: status,
});

const setQuery = (query: string): SetTodoQuery => ({
  type: SET_QUERY,
  payload: query,
});

type State = {
  query: string;
  status: string;
};

const initialState: State = {
  query: '',
  status: 'all',
};

type Action = SetTodoStatus | SetTodoQuery;

export const actions = { setQuery, setStatus };

const filterReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SET_QUERY:
      return { ...state, query: action.payload };

    case SET_STATUS:
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
