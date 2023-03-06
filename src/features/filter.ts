import { Status } from '../types/Status';

type SetQueryAction = { type: 'filter/SET_QUARY', payload: string };
type SetStatusAction = { type: 'filter/SET_STATUS', payload: Status };

type Action = SetQueryAction | SetStatusAction;

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUARY',
  payload: query,
});

type Filter = {
  status: Status;
  query: string;
};

const initialValue: Filter = { status: 'all', query: '' };

const filterReducer = (filter: Filter = initialValue, action: Action) => {
  switch (action.type) {
    case 'filter/SET_QUARY':
      return { ...filter, query: action.payload };

    case 'filter/SET_STATUS':
      return { ...filter, status: action.payload };

    default:
      return filter;
  }
};

export const actions = { setStatus, setQuery };
export default filterReducer;
