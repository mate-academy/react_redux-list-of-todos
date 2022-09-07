import { Action as BaseAction } from 'redux';

export type FilterByType = 'all' | 'active' | 'completed';

export enum FilterActionType {
  SelectTodos = 'filter/SELECT_TODOS',
  SetQuery = 'filter/SET_QUERY',
}

export interface Action<T, P> extends BaseAction<T> {
  payload: P,
}

type SelectTodosAction = Action<FilterActionType.SelectTodos, FilterByType>;
type SetQueryAction = Action<FilterActionType.SetQuery, string>;

export type FilterAction = SelectTodosAction | SetQueryAction;

export const actions = {
  selectTodosActionCreator: (filterBy: FilterByType): SelectTodosAction => ({
    type: FilterActionType.SelectTodos,
    payload: filterBy,
  }),
  setQueryActionCreator: (query: string): SetQueryAction => ({
    type: FilterActionType.SetQuery,
    payload: query,
  }),
};

export interface FilterState {
  filteringBy: FilterByType,
  query: string,
}

export const selector = {
  getQuery: (state: FilterState): string => state.query,
  getfilteringBy: (state: FilterState): FilterByType => state.filteringBy,
};

const initialState: FilterState = {
  filteringBy: 'all',
  query: '',
};

const filterReduser = (
  state = initialState,
  action: FilterAction,
) => {
  switch (action.type) {
    case FilterActionType.SelectTodos:
      return {
        ...state,
        filteringBy: action.payload,
      };

    case FilterActionType.SetQuery:
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
};

export default filterReduser;
