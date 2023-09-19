import { Status } from '../types/Status';

export const setQuery = (query: string) => ({
  type: 'SET_QUERY',
  payload: query,
});

export const setStatus = (status: Status) => ({
  type: 'SET_STATUS',
  payload: status,
});
export const actions = { setQuery, setStatus };

type Action = ReturnType<typeof setQuery> | ReturnType<typeof setStatus>;

const initialState = {
  query: '',
  status: 'all',
};

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };
    case 'SET_STATUS':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
