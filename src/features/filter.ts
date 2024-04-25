import { Status } from '../types/Status';

type SetStatusAction = {
  type: 'filter/SET_STATUS';
  payload: Status;
};

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

type ClearQueryActions = {
  type: 'filter/CLEAR_QUERY';
};

const clearQuery = (): ClearQueryActions => ({
  type: 'filter/CLEAR_QUERY',
});

type FilterState = {
  query: string;
  status: Status;
};

const initialState: FilterState = {
  query: '',
  status: 'all',
};

type Action = SetStatusAction | SetQueryAction | ClearQueryActions;

const filterReducer = (status: FilterState = initialState, action: Action): FilterState => {
  switch (action.type) {
    case 'filter/SET_STATUS':
      return {
        ...status,
        status: action.payload,
      };

    case 'filter/SET_QUERY':
      return {
        ...status,
        query: action.payload,
      };

    case 'filter/CLEAR_QUERY':
      return {
        ...status,
        query: '',
      };
    default:
      return status;
  };
};

export const actions = { setStatus, setQuery, clearQuery };

export default filterReducer;
