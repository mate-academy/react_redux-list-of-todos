import { Status } from '../types/Status';

interface SetQueryActions {
  type: 'filter/SET_QUERY',
  payload: string
}
interface RemoveQueryActions {
  type: 'filter/REMOVE_QUERY'
}
interface SetStatusActions {
  type: 'filter/SET_STATUS',
  payload: Status
}

type Action = SetQueryActions | RemoveQueryActions | SetStatusActions;

const setQuery = (query: string): SetQueryActions => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const removeQuery = (): RemoveQueryActions => ({
  type: 'filter/REMOVE_QUERY',
});

const setStatus = (status: Status): SetStatusActions => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

export const actions = { setQuery, removeQuery, setStatus };

interface State {
  query: string,
  status: Status,
}

const initState: State = { query: '', status: 'all' };

const filterReducer = (state = initState, action: Action): State => {
  switch (action.type) {
    case 'filter/REMOVE_QUERY':
      return { ...state, query: '' };
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };
    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
