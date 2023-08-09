import { Status } from '../types/Status';

type SetQueryAction = {
  type: 'filter/QUERY_SET',
  payload: string,
};

type ClearQueryAction = {
  type: 'filter/QUERY_CLEAR',
};

type SetStatusAction = {
  type: 'filter/STATUS_SET',
  payload: string,
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/QUERY_SET',
  payload: query,
});

const clearQuery = (): ClearQueryAction => ({
  type: 'filter/QUERY_CLEAR',
});

const setStatus = (status: string): SetStatusAction => ({
  type: 'filter/STATUS_SET',
  payload: status,
});

type State = {
  query: string,
  status: string,
};

type Actions = SetQueryAction | ClearQueryAction | SetStatusAction;

const initialFilter = {
  query: '',
  status: Status.All,
};

const filterReducer = (
  state: State = initialFilter,
  action: Actions,
): State => {
  switch (action.type) {
    case 'filter/QUERY_CLEAR':
      return { ...state, query: '' };

    case 'filter/QUERY_SET':
      return { ...state, query: action.payload };

    case 'filter/STATUS_SET':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export const filterActions = { setQuery, clearQuery, setStatus };
export default filterReducer;
