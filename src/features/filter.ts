import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'filter/SET_QUERY',
  payload: string,
};

type SetStatusAction = {
  type: 'filter/SET_STATUS',
  payload: Status,
};

type Action = SetQueryAction | SetStatusAction;

export type FilterParams = {
  query: string,
  status: Status,
};

const setFilterQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setFilterStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

const initialFilterParams: FilterParams = {
  query: '',
  status: Status.ALL,
};

export const actions = { setFilterQuery, setFilterStatus };

const filterReducer = (
  filterParams: FilterParams = initialFilterParams,
  action: Action,
): FilterParams => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return {
        ...filterParams,
        query: action.payload,
      };

    case 'filter/SET_STATUS':
      return {
        ...filterParams,
        status: action.payload,
      };

    default:
      return filterParams;
  }
};

export default filterReducer;
