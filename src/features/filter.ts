import { Status } from '../types/Status';

type RemoveQuery = { type: 'query/REMOVE' };

type SetQuery = {
  type: 'query/SET';
  payload: string;
};

type SetFilter = {
  type: 'SetFilter/SET';
  payload: Status;
};

const removeQuery = (): RemoveQuery => ({ type: 'query/REMOVE' });

const setQuery = (newQuery: string): SetQuery => ({
  type: 'query/SET',
  payload: newQuery,
});

const setFilter = (newStatus: Status): SetFilter => ({
  type: 'SetFilter/SET',
  payload: newStatus,
});

export const actions = {
  removeQuery,
  setQuery,
  setFilter,
};

type State = {
  query: string;
  filter: Status;
};
type Action = RemoveQuery | SetQuery | SetFilter;

const filterReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: State = { query: '', filter: Status.All },
  action: Action,
): State => {
  switch (action.type) {
    case 'query/REMOVE': {
      return { query: '', filter: Status.All };
    }

    case 'SetFilter/SET': {
      return { ...state, filter: action.payload };
    }

    case 'query/SET': {
      return { ...state, query: action.payload };
    }

    default:
      return state;
  }
};

export default filterReducer;
