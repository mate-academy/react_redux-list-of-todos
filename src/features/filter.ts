import { Status } from '../types/Status';

const FILTER = 'filter/query';
const ISDONE = 'filter/isdone';

type QueryAction = {
  type: 'filter/query';
  payload: string;
};

type IsDoneAction = {
  type: 'filter/isdone';
  payload: Status;
};

const isDoneAction = (filterBy: Status): IsDoneAction => ({
  type: ISDONE,
  payload: filterBy,
});

const queryAction = (query: string): QueryAction => ({
  type: FILTER,
  payload: query,
});

export const actions = { queryAction, isDoneAction };

type Action = QueryAction | IsDoneAction;

const initialState = {
  query: '',
  status: 'all',
};

const filterReducer = (filter = initialState, action: Action) => {
  switch (action.type) {
    case FILTER:
      return {
        ...filter,
        query: action.payload,
      };
    case ISDONE:
      return {
        ...filter,
        status: action.payload,
      };
    default:
      return filter;
  }
};

export default filterReducer;
