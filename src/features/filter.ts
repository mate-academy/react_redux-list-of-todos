import { Status } from '../types/Status';

type SetQuery = { type: 'query/SET', payload: string };
type ClearQuery = { type: 'query/CLEAR' };
type SetFilter = { type: 'filter/SET', payload: Status };
type Action = SetQuery | ClearQuery | SetFilter;
type State = { query: string, status: Status };

const changeQuery = (value: string): SetQuery => (
  { type: 'query/SET', payload: value });

const clearQuery = (): ClearQuery => ({ type: 'query/CLEAR' });

const changeFilter = (value: Status): SetFilter => (
  { type: 'filter/SET', payload: value });

const initialState: State = { query: '', status: 'all' };

const filterReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/SET':
      return { ...state, status: action.payload };

    case 'query/SET':
      return { ...state, query: action.payload };

    case 'query/CLEAR':
      return { ...state, query: '' };

    default:
      return state;
  }
};

export const actions = { changeQuery, clearQuery, changeFilter };
export default filterReducer;
