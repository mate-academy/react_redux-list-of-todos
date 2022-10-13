import { Status } from '../types/Status';

type StatusAction = { type: 'filter/Status', payload: Status };
type QueryAction = { type: 'filter/Query', payload: string };
type Action = StatusAction | QueryAction;

const status = (value: Status): StatusAction => ({
  type: 'filter/Status',
  payload: value,
});

const query = (value: string): QueryAction => ({
  type: 'filter/Query',
  payload: value,
});

export const actions = { status, query };

type State = {
  status: Status,
  query: string,
};

const initialState: State = {
  status: 'all',
  query: '',
};

const filterReducer = (
  filters: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/Status':
      return {
        ...filters, status: action.payload,
      };
    case 'filter/Query':
      return {
        ...filters, query: action.payload,
      };
    default:
      return filters;
  }
};

export default filterReducer;
