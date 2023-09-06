import { Status } from '../types/Status';

enum Type {
  query = 'add/query',
  clearQuery = 'add/clear',
  status = 'add/status',
}

type QueryAction = { type: Type.query, payload: string };
type StatusAction = { type: Type.status, payload: string };
type ClearAction = { type: Type.clearQuery };

type Actions = QueryAction | StatusAction | ClearAction;

const addQuery = (query: string) => ({ type: Type.query, payload: query });
const addStatus = (status: Status) => ({ type: Type.status, payload: status });
const clearQuery = () => ({ type: Type.clearQuery });

export const actions = { addQuery, addStatus, clearQuery };

type Param = {
  query: string,
  status: Status,
};

const initialParams: Param = { query: '', status: 'all' };

const filterReducer = (
  state: Param = initialParams,
  action: Actions,
): Param => {
  switch (action.type) {
    case Type.query:
      return { ...state, query: action.payload };
    case Type.status:
      return { ...state, status: action.payload as Status };
    case Type.clearQuery:
      return { ...state, query: '' };
    default:
      return state;
  }
};

export default filterReducer;
