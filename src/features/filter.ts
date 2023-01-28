import { Status } from '../types/Status';

type SetFilterQueryAction = {
  type: 'filterQuery/SET';
  payload: string;
};

type SetFilterStatusAction = {
  type: 'filterStatus/SET';
  payload: Status;
};

const setFilterQuery = (query: string): SetFilterQueryAction => ({
  type: 'filterQuery/SET',
  payload: query,
});

const setFilterStatus = (status: Status): SetFilterStatusAction => ({
  type: 'filterStatus/SET',
  payload: status,
});

export const actions = { setFilterQuery, setFilterStatus };

type FilterParams = {
  query: string;
  status: Status;
};

type Action = SetFilterQueryAction | SetFilterStatusAction;

const initialFilterParams: FilterParams = {
  query: '',
  status: Status.ALL,
};

const filterReducer = (
  filterParams: FilterParams = initialFilterParams,
  action: Action,
): FilterParams => {
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
