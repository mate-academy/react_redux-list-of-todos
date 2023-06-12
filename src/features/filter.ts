import { Status } from '../types/Status';

type QueryUpdateAction = { type: 'query/UPDATE', payload: string };
type QueryResetAction = { type: 'query/RESET' };
type StatusChangeAction = { type: 'status/CHANGE', payload: Status };

const updateQuery = (newQuery: string): QueryUpdateAction => {
  return { type: 'query/UPDATE', payload: newQuery };
};

const changeStatus = (status: Status): StatusChangeAction => {
  return { type: 'status/CHANGE', payload: status };
};

const resetQuery = (): QueryResetAction => ({ type: 'query/RESET' });

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
    case 'query/RESET':
      return { ...state, query: '' };
    case 'query/UPDATE':
      return { ...state, query: action.payload };
    case 'status/CHANGE':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
