import { Status } from '../types/Status';

type QueryAction = {
  type: 'filter/Query';
  payload: string;
};

type StatusAction = {
  type: 'filter/Status';
  payload: string;
};

const setQuery = (query: string): QueryAction => ({
  type: 'filter/Query',
  payload: query,
});

const setStatus = (status: Status): StatusAction => ({
  type: 'filter/Status',
  payload: status,
});

export const actions = { setQuery, setStatus };

type State = {
  query: string;
  status: Status;
};

const initialState: State = {
  query: '',
  status: 'all',
};

type Action = QueryAction | StatusAction;

const filterReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/Query':
      return {
        ...state,
        query: action.payload,
      };
    case 'filter/Status':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return initialState;
  }
};

export default filterReducer;
