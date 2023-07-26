import { Status } from '../types/Status';

type SetFilterQueryAction = {
  type: 'filter/setQuery',
  payload: string,
};

type SetFilterStatusAction = {
  type: 'filter/setStatus',
  payload: Status,
};

const setQuery = (query: string): SetFilterQueryAction => ({
  type: 'filter/setQuery',
  payload: query,
});

const setStatus = (status: Status): SetFilterStatusAction => ({
  type: 'filter/setStatus',
  payload: status,
});

export const actions = { setQuery, setStatus };

type State = {
  query: string,
  status: Status,
};

type Action = SetFilterQueryAction | SetFilterStatusAction;

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/setQuery':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/setStatus':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
