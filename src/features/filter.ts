import { Filter, Status } from '../types/Status';

type Action = { type: Status; payload: string };

export const actions = {
  setFilter: (filter: Status, query: string): Action => ({
    type: filter,
    payload: query,
  }),
};

const initialState = {
  query: '',
  status: Filter.ALL,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case Filter.ALL:
      return {
        ...state,
        query: action.payload,
        status: action.type,
      };

    case Filter.ACTIVE:
      return {
        ...state,
        query: action.payload,
        status: action.type,
      };

    case Filter.COMPLETED:
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
