import { Status } from '../types/Status';

type SetQuery = { type: 'set/query'; payload: string };
type ChangeStatus = { type: 'change/status'; payload: Status };
type Clear = { type: 'clear' };

type Action = SetQuery | ChangeStatus | Clear;

const setQuery = (query: string) => ({ type: 'set/query', payload: query });
const changeStatus = (status: Status) => ({
  type: 'change/status',
  payload: status,
});

const clearQuery = () => ({ type: 'clear' });

export const actions = { setQuery, changeStatus, clearQuery };

type InitialFilter = {
  query: string;
  status: Status;
};

const initialState: InitialFilter = { query: '', status: 'all' };

const filterReducer = (state: InitialFilter = initialState, action: Action) => {
  switch (action.type) {
    case 'set/query':
      return { ...state, query: action.payload };
    case 'change/status':
      return { ...state, status: action.payload };
    case 'clear':
      return { ...state, query: '' };
    default:
      return state;
  }
};

export default filterReducer;
