import { FilterField } from '../types/FilterField';

type SetQueryAction = {
  type: FilterField.setQuery,
  payload: string
};

type RemoveQueryAction = {
  type: FilterField.removeQuery
};

type SetFilterStatus = {
  type: FilterField.setStatus,
  payload: string
};

type Action = SetQueryAction | RemoveQueryAction | SetFilterStatus;

const setQuery = (query: string): Action => ({
  type: FilterField.setQuery,
  payload: query,
});

const removeQuery = (): Action => ({
  type: FilterField.removeQuery,
});

const setStatus = (status: string): Action => ({
  type: FilterField.setStatus,
  payload: status,
});

export const actions = { setQuery, removeQuery, setStatus };

type Filter = {
  query: string;
  status: string;
};

const initialFilter: Filter = {
  query: '',
  status: 'all',
};

const filterReducer = (filter: Filter = initialFilter, action: Action) => {
  switch (action.type) {
    case FilterField.setQuery:
      return {
        ...filter,
        query: action.payload,
      };

    case FilterField.setStatus:
      return {
        ...filter,
        status: action.payload,
      };

    case FilterField.removeQuery:
      return {
        query: '',
        status: filter.status,
      };

    default:
      return filter;
  }
};

export default filterReducer;
