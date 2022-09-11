import { Status } from '../types/Status';

interface SetStatusAction {
  type: 'filter/set_status',
  payload: Status,
}

interface SetQueryAction {
  type: 'filter/set_query',
  payload: string,
}

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/set_status',
  payload: status,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/set_query',
  payload: query,
});

export const filterActions = { setStatus, setQuery };

interface State {
  query: string;
  status: Status;
}

const initialState: State = {
  query: '',
  status: 'all',
};

type Action = SetQueryAction | SetStatusAction;

const filterReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/set_query':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/set_status':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
