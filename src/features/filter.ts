import { Status } from '../types/Status';

type SetQueryAction = { type: 'filter/QUERY', payload: string };
type SetStatusAction = { type: 'filter/STATUS', payload: Status };

type Action = SetQueryAction | SetStatusAction;

const setQuery = (value: string): SetQueryAction => ({
  type: 'filter/QUERY',
  payload: value,
});
const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/STATUS',
  payload: status,
});

export const actions = { setQuery, setStatus };

const filterReducer = (
  filter = {
    query: '',
    status: Status.all,
  },
  action: Action,
) => {
  switch (action.type) {
    case 'filter/QUERY':
      return { ...filter, query: action.payload };

    case 'filter/STATUS':
      return { ...filter, status: action.payload };

    default:
      return filter;
  }
};

export default filterReducer;
