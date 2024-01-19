import { Status } from '../types/Status';

export const actions = { /* put action creators here */};

type QueryAction = {
  type: 'filter/QUERY',
  payload: string,
};

const setQuery = (query: string): QueryAction => ({
  type: 'filter/QUERY',
  payload: query,
});

type StatusAction = {
  type: 'filter/STATUS',
  payload: Status,
};

const setStatus = (status: Status): StatusAction => ({
  type: 'filter/STATUS',
  payload: status,
});

const initialState = {
  query: '',
  status: 'all',
};

type Action = QueryAction | StatusAction;

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/QUERY':
      return { ...state, query: action.payload };

    case 'filter/STATUS':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export const action = { setQuery, setStatus };
export default filterReducer;
