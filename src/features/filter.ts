import { Status } from '../types/Status';

export const setQuery = (query: string) => ({
  type: 'query' as const,
  payload: query,
});

export const setStatus = (status: Status) => ({
  type: 'status' as const,
  payload: status,
});

const initialState = {
  query: '',
  status: 'all' as Status,
};

type Action = ReturnType<typeof setQuery> | ReturnType<typeof setStatus>;

export const actions = { setQuery, setStatus };

// eslint-disable-next-line @typescript-eslint/default-param-last
const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'query':
      return { ...state, query: action.payload };
    case 'status':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
