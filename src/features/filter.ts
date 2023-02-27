import { Status } from '../types/Status';

type AddQueryAction = {
  type: 'filter/setQuery',
  payload: string,
};

type AddStatusAction = {
  type: 'filter/setStatus',
  payload: string,
};

const setQuery = (query: string): AddQueryAction => ({
  type: 'filter/setQuery',
  payload: query,
});

const setStatus = (status: string): AddStatusAction => ({
  type: 'filter/setStatus',
  payload: status,
});

export const actions = { setQuery, setStatus };

type State = {
  query: string,
  status: string,
};

type Action = AddQueryAction | AddStatusAction;

const defaultState = {
  query: '',
  status: Status.ALL,
};

const filterReducer = (
  state: State = defaultState,
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
