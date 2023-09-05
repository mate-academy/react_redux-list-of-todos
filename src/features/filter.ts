import { Status } from '../types/Status';

type QueryAction = { type: 'add/query', payload: string };
type StatusAction = { type: 'add/status', payload: string };
type ClearAction = { type: 'add/clear' };

type Actions = QueryAction | StatusAction | ClearAction;

const addQuery = (query: string) => ({ type: 'add/query', payload: query });
const addStatus = (status: Status) => ({ type: 'add/status', payload: status });
const clearQuery = () => ({ type: 'add/clear' });

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
    case 'add/query':
      return { ...state, query: action.payload };
    case 'add/status':
      return { ...state, status: action.payload as Status };
    case 'add/clear':
      return { ...state, query: '' };
    default:
      return state;
  }
};

export default filterReducer;
