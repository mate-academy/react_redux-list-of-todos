import { Status } from '../types/Status';

export enum FilterActionsTypes {
  QUERY = 'filter/SET_QUERY',
  SELECT = 'filter/SET_SELECT',
}

type FilterQueryAction = { type: FilterActionsTypes.QUERY, payload: string };
type FilterSelectAction = { type: FilterActionsTypes.SELECT, payload: string };

const setQuery = (query: string): FilterQueryAction => ({
  type: FilterActionsTypes.QUERY,
  payload: query,
});

const setSelect = (select: Status): FilterSelectAction => ({
  type: FilterActionsTypes.SELECT,
  payload: select,
});

export const actions = { setQuery, setSelect };

type Action = FilterQueryAction | FilterSelectAction;

export type State = {
  query: string,
  select: 'all',
};

const defaultState: State = {
  query: '',
  select: 'all',
};

const filterReducer = (state: State = defaultState, action: Action) => {
  switch (action.type) {
    case FilterActionsTypes.QUERY:
      return { ...state, query: action.payload };
    case FilterActionsTypes.SELECT:
      return { ...state, select: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
