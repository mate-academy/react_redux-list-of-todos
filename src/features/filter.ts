import { Status } from '../types/Status';

type ChangeStatusAction = { type: 'status/CHANGE', payload: Status };
type SetQueryAction = { type: 'query/SET', payload: string };
type ClearQueryAction = { type: 'query/CLEAR' };

type Action = ChangeStatusAction | SetQueryAction | ClearQueryAction;

const changeStatus = (status: Status): ChangeStatusAction => (
  { type: 'status/CHANGE', payload: status }
);

const setQuery = (query: string): SetQueryAction => (
  { type: 'query/SET', payload: query }
);

const clearQuery = (): ClearQueryAction => ({ type: 'query/CLEAR' });

export const filterActions = { changeStatus, setQuery, clearQuery };

const initialFilter = {
  query: '',
  status: Status.All,
};

const filterReducer = (filter = initialFilter, action: Action) => {
  switch (action.type) {
    case 'status/CHANGE':
      return { ...filter, status: action.payload };

    case 'query/SET':
      return { ...filter, query: action.payload };

    case 'query/CLEAR':
      return { ...filter, query: '' };

    default:
      return filter;
  }
};

export default filterReducer;
