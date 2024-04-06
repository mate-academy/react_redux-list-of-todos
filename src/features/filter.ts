import { Status } from '../types/Status';

type Action = { type: Status; payload: string };

export const actions = {
  setFilter: (filter: Status, query: string): Action => ({
    type: filter,
    payload: query,
  }),
};

const initialState = {
  query: '',
  status: 'all',
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'all':
      return {
        ...state,
        query: action.payload,
        status: action.type,
      };

    case 'active':
      return {
        ...state,
        query: action.payload,
        status: action.type,
      };

    case 'completed':
      return {
        ...state,
        query: action.payload,
        status: action.type,
      };

    default:
      return {
        ...state,
      };
  }
};

export default filterReducer;
