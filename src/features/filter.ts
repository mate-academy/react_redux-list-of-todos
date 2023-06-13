import { Status } from '../types/Status';

const UPDATE = 'query/UPDATE';
const RESET = 'query/RESET';
const CHANGE = 'status/CHANGE';

type QueryUpdateAction = { type: typeof UPDATE, payload: string };
type QueryResetAction = { type: typeof RESET };
type StatusChangeAction = { type: typeof CHANGE, payload: Status };

const updateQuery = (newQuery: string): QueryUpdateAction => {
  return { type: UPDATE, payload: newQuery };
};

const changeStatus = (status: Status): StatusChangeAction => {
  return { type: CHANGE, payload: status };
};

const resetQuery = (): QueryResetAction => ({ type: RESET });

export const actions = { updateQuery, resetQuery, changeStatus };

type Action = QueryResetAction | QueryUpdateAction | StatusChangeAction;
export type State = { query: string, status: Status };

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case RESET:
      return { ...state, query: '' };
    case UPDATE:
      return { ...state, query: action.payload };
    case CHANGE:
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
