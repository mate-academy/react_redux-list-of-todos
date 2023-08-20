import { Status } from '../types/Status';

type Action = { type: 'FILTER', payload: { query: string, status: Status } };

const filter = (query: string, status: Status): Action => ({
  type: 'FILTER',
  payload: { query, status },
});

export const actions = {
  filter,
};

const initialState = { query: '', status: Status.All };

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'FILTER':
      return {
        query: action.payload.query,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

export default filterReducer;
