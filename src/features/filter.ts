import { FilterStatusType } from '../types/Status';

type SetQueryAction = {
  type: 'filter/SET_QUERY'
  payload: string,
};

type SetStatusAction = {
  type: 'filter/SET_STATUS'
  payload: FilterStatusType,
};

export const actions = {
  setQuery: (query: string): SetQueryAction => ({
    type: 'filter/SET_QUERY',
    payload: query,
  }),

  setStatus: (status: FilterStatusType): SetStatusAction => ({
    type: 'filter/SET_STATUS',
    payload: status,
  }),
};

export type FilterParams = {
  query: string,
  status: FilterStatusType,
};

const initialFilterParams: FilterParams = {
  query: '',
  status: FilterStatusType.all,
};

type Action = SetQueryAction | SetStatusAction;

const filterReducer = (
  filterParams: FilterParams = initialFilterParams,
  action: Action,
): FilterParams => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...filterParams, query: action.payload };

    case 'filter/SET_STATUS':
      return { ...filterParams, status: action.payload };

    default:
      return filterParams;
  }
};

export default filterReducer;
