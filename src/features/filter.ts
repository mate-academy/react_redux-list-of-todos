import { Status } from '../types/Status';

type StatusAction = { type: 'filter/Status', payload: Status };
type QueryAction = { type: 'filter/Query', payload: string };

type Action = StatusAction | QueryAction;

const filterStatus = (value: Status): StatusAction => ({
  type: 'filter/Status',
  payload: value,
});

const filterQuery = (value: string): QueryAction => ({
  type: 'filter/Query',
  payload: value,
});

const initialState = {
  query: '',
  status: 'all',
};

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/Status':
      return { ...state, status: action.payload };

    case 'filter/Query':
      return { ...state, query: action.payload };

    default:
      return state;
  }
};

export const actions = { filterStatus, filterQuery };

export default filterReducer;
