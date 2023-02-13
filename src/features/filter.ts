import { Status } from '../types/Status';

type AddQueryAction = {
  type: 'query/ADD';
  payload: string;
};

const addQuery = (query: string): AddQueryAction => ({
  type: 'query/ADD',
  payload: query,
});

type DeleteQueryAction = {
  type: 'query/DELETE';
};

const deleteQuery = (): DeleteQueryAction => ({ type: 'query/DELETE' });

type SetStatus = {
  type: 'status/SET';
  payload: Status;
};

const setStatus = (status: Status):SetStatus => ({
  type: 'status/SET',
  payload: status,
});

type Actions = AddQueryAction
| DeleteQueryAction
| SetStatus;

type Filter = {
  query: string,
  status: Status
};

const startFilter: Filter = { query: '', status: Status.all };

const filterReducer
  = (filter: Filter = startFilter, action: Actions): Filter => {
    switch (action.type) {
      case 'query/ADD':
        return {
          ...filter,
          query: action.payload,
        };

      case 'query/DELETE':
        return {
          ...filter,
          query: '',
        };

      case 'status/SET':
        return {
          ...filter,
          status: action.payload,
        };

      default:
        return filter;
    }
  };

export const action = { addQuery, deleteQuery, setStatus };

export default filterReducer;
