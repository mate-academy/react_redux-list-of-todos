import { Status } from '../types/Status';

const setQuery = (query: string) => ({
  type: 'SET_QUERY',
  payload: query,
});

const setStatus = (status: Status) => ({
  type: 'SET_STATUS',
  payload: status,
});

interface FilterState {
  query: string;
  status: Status;
}

export const actions = { setQuery, setStatus };

const initialState: FilterState = {
  query: '',
  status: Status.all,
};

const filterReducer = (state = initialState, action: any) => {
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
