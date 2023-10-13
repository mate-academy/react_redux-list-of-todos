import { Status } from '../types/Status';

type SetStatusAction = {
  type: 'filter/STATUS';
  payload: string;
};

type SetQueryAction = {
  type: 'filter/QUERY';
  payload: string;
};

type Action = SetStatusAction | SetQueryAction;
type State = {
  query: string;
  status: string;
};

const setStatus = (status: string): SetStatusAction => ({
  type: 'filter/STATUS',
  payload: status,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/QUERY',
  payload: query,
});

export const actions = { setStatus, setQuery };

const startValue: State = {
  query: '',
  status: Status.all,
};

const filterReducer = (
  state: State = startValue,
  action: Action,
) => {
  switch (action.type) {
    case 'filter/STATUS':
      return {
        ...state,
        status: action.payload,
      };

    case 'filter/QUERY':
      return {
        ...state,
        query: action.payload.toLowerCase(),
      };

    default:
      return state;
  }
};

export default filterReducer;
