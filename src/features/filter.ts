import { Status } from '../types/Status';

type AddQuery = {
  type: 'filter/QUERY',
  payload: string,
};

type AddFilterValue = {
  type: 'filter/STATUS',
  payload: Status,
};

type Action = AddQuery | AddFilterValue;

const setQuery = (value: string): AddQuery => (
  { type: 'filter/QUERY', payload: value }
);
const setStatus = (value: Status): AddFilterValue => (
  { type: 'filter/STATUS', payload: value }
);

const defaultValue = {
  query: '',
  status: 'all',
};

export const actions = { setQuery, setStatus };

const filterReducer = (state = defaultValue, action: Action) => {
  switch (action.type) {
    case 'filter/QUERY':
      return { ...state, query: action.payload };

    case 'filter/STATUS':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
