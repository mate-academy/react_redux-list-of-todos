import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'filterQuery/SET';
  payload: string;
};

type SetStatusAction = {
  type: 'filterStatus/SET';
  payload: Status;
};

const setQueryAction = (query: string): SetQueryAction => ({
  type: 'filterQuery/SET',
  payload: query,
});

const setStatusAction = (status: Status): SetStatusAction => ({
  type: 'filterStatus/SET',
  payload: status,
});

export const actions = {
  setQueryAction,
  setStatusAction,
};

type FilterParams = {
  query: string;
  status: Status;
};

type Action = SetQueryAction | SetStatusAction;

const initialFilterParams: FilterParams = {
  query: '',
  status: Status.ALL,
};

const filterReducer = (
  filterParams: FilterParams = initialFilterParams,
  action: Action,
) => {
  switch (action.type) {
    case 'filterQuery/SET':
      return { ...filterParams, query: action.payload };

    case 'filterStatus/SET':
      return { ...filterParams, status: action.payload };

    default:
      return filterParams;
  }
};

export default filterReducer;
