import { Status } from '../enum/Status';

type StatusAction = {
  type: 'filter/status',
  payload: Status,
};

type QueryAction = {
  type: 'filter/query',
  payload: string,
};

type Action = StatusAction | QueryAction;

const changeStatus = (status: Status): StatusAction => {
  return {
    type: 'filter/status',
    payload: status,
  };
};

const changeQuery = (query: string): QueryAction => {
  return {
    type: 'filter/query',
    payload: query,
  }
}

export const actions = { changeStatus, changeQuery };

const initialFilter = {
  status: Status.All,
  query: '',
};

const filterReducer = (filter = initialFilter, action: Action) => {
  switch (action.type) {
    case 'filter/query':
      return { ...filter, query: action.payload };
    case 'filter/status':
      return { ...filter, status: action.payload };
    default:
      return filter;
  }
};

export default filterReducer;
