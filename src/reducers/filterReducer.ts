import { Status } from '../types/Status';

type FilterAction = { type: 'filter/SET_QUERY'; payload: string };
type StatusAction = { type: 'status/SET_STATUS'; payload: Status };
type Action = FilterAction | StatusAction;

const filterByQuery = (query: string): FilterAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const filterByStatus = (status: Status): StatusAction => ({
  type: 'status/SET_STATUS',
  payload: status,
});

export const actions = { filterByQuery, filterByStatus };

type State = {
  query: string;
  status: Status;
};

const initialState: State = { query: '', status: Status.All };

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };

    case 'status/SET_STATUS':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default filterReducer;
