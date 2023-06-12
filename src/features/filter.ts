import { Status } from '../types/Status';

type SetStatusAction = {
  type: 'filter/setStatus';
  payload: Status;
};

type SetQueryAction = {
  type: 'filter/setQuery';
  payload: string;
};

type ClearQueryAction = {
  type: 'filter/clearQuery'
};

type Action = SetStatusAction
| SetQueryAction
| ClearQueryAction;

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/setStatus',
  payload: status,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/setQuery',
  payload: query,
});

const clearQuery = (): ClearQueryAction => ({
  type: 'filter/clearQuery',
});

export const actions = { setStatus, setQuery, clearQuery };

type State = {
  status: Status,
  query: string;
};

const initialState = {
  status: Status.ALL,
  query: '',
};

const filterReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/setStatus':
      return {
        ...state,
        status: action.payload,
      };

    case 'filter/setQuery':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/clearQuery':
      return {
        ...state,
        query: '',
      };

    default:
      return state;
  }
};

export default filterReducer;
