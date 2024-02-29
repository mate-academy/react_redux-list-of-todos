import { SearchParams } from '../types/SearchParams';

type SetQuery = {
  type: 'query/ADD';
  payload: string;
};

const setActionQuery = (value: string): SetQuery => ({
  type: 'query/ADD',
  payload: value,
});

type ClearQery = {
  type: 'query/CLEAR';
  payload: '';
};

const clearAcrionQuery = (): ClearQery => ({
  type: 'query/CLEAR',
  payload: '',
});

type SetStatus = {
  type: 'status/SET';
  payload: string;
};

const SetActionStatus = (value: string): SetStatus => ({
  type: 'status/SET',
  payload: value,
});

type Action = SetQuery | SetStatus | ClearQery;

export const actions = {
  setActionQuery,
  SetActionStatus,
  clearAcrionQuery,
};

const initialState: SearchParams = {
  query: '',
  status: 'all',
};

const filterReducer = (filter = initialState, action: Action): SearchParams => {
  switch (action.type) {
    case 'query/ADD':
      return { ...filter, query: action.payload };
    case 'query/CLEAR':
      return { ...filter, query: action.payload };
    case 'status/SET':
      return { ...filter, status: action.payload };
    default:
      return filter;
  }
};

export default filterReducer;
