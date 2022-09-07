import { Action as ActionBase } from 'redux';

interface Action<T, P> extends ActionBase<T> {
  payload: P,
}

export enum FiltersActionsTypes {
  SetStatus = 'filter/set_status',
  SetQuery = 'filter/set_query',
}

export type FiltersAction = Action<FiltersActionsTypes.SetStatus
| FiltersActionsTypes.SetQuery, string>;

const setStatus = (status: string): FiltersAction => ({
  type: FiltersActionsTypes.SetStatus,
  payload: status,
});

const setQuery = (query: string): FiltersAction => ({
  type: FiltersActionsTypes.SetQuery,
  payload: query,
});

export const FILTER_ACTIONS = {
  setStatus,
  setQuery,
};

interface FilterStateInterface {
  status: string;
  query: string;
}

type State = {
  status: string;
  query: string;
};

const initState: FilterStateInterface = {
  status: 'all',
  query: '',
};

export const filterReducer = (
  state: FilterStateInterface = { ...initState },
  actions: FiltersAction,
): State => {
  switch (actions.type) {
    case FiltersActionsTypes.SetStatus:
      return {
        ...state,
        status: actions.payload,
      };

    case FiltersActionsTypes.SetQuery:
      return {
        ...state,
        query: actions.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
