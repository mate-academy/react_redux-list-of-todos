import { Status } from '../types/Status';

type QueryChange = { type: 'query/Change', payload: string };

const queryChange = (query: string): QueryChange => ({
  type: 'query/Change',
  payload: query,
});

type StatusChange = { type: 'status/Change', payload: Status };

const statusChange = (newStatus: Status): StatusChange => ({
  type: 'status/Change',
  payload: newStatus,
});

type Action = QueryChange | StatusChange;

type FilterConditions = {
  query: string;
  status: Status;
};

const filterReducer = (filterConditions: FilterConditions = {
  query: '',
  status: Status.All,
}, action: Action) => {
  switch (action.type) {
    case 'query/Change':
      return {
        ...filterConditions,
        query: action.payload,
      };

    case 'status/Change':
      return {
        ...filterConditions,
        status: action.payload,
      };

    default:
      return filterConditions;
  }
};

export const actions = { queryChange, statusChange };
export default filterReducer;
