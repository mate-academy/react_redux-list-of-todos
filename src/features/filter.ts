import { Status } from '../types/Status';

type SetQueryAction = { type: 'filter/SET_QUERY', payload: string };
type ClearQueryAction = { type: 'filter/CLEAR_QUERY' };
type SetStatusAction = { type: 'filter/SET_STATUS', payload: Status };

export const actions = {
  setQuery: (value: string): SetQueryAction => (
    { type: 'filter/SET_QUERY', payload: value }
  ),
  clearQuery: (): ClearQueryAction => (
    { type: 'filter/CLEAR_QUERY' }
  ),
  setStatus: (value: Status): SetStatusAction => (
    { type: 'filter/SET_STATUS', payload: value }
  ),
};

type State = { query: string, status: Status };
type Action = SetQueryAction | ClearQueryAction | SetStatusAction ;

const initialState: State = { query: '', status: Status.All };

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ('filter/SET_QUERY'):
      return { ...state, query: action.payload };

    case ('filter/CLEAR_QUERY'):
      return { ...state, query: '' };

    case ('filter/SET_STATUS'):
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
