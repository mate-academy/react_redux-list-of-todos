import { Status } from '../types/Status';

type AddQueryAction = {
  type: 'filter/setQuery',
  payload: string,
};

type AddStatusAction = {
  type: 'filter/setStatus',
  payload: string,
};

const setStatus = (status: string): AddStatusAction => ({
  type: 'filter/setStatus',
  payload: status,
});

const setQuery = (query: string): AddQueryAction => ({
  type: 'filter/setQuery',
  payload: query,
});

export const actions = { setQuery, setStatus };

type Action = AddStatusAction | AddQueryAction;

export type State = {
  query: string,
  status: string,
};

const initialState = {
  query: '',
  status: Status.All,
};

const filterReducer = (
  state: State = initialState,
  action: Action,
) => {
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
