import { Action } from '../types/Action';
import { Status } from '../types/Status';

export enum FilterActionType {
  SetQuery = 'filter/set_query',
  SetStatus = 'filter/set_status',
}

type SetQueryAction = Action<FilterActionType.SetQuery, string>;
type SetStatusAction = Action<FilterActionType.SetStatus, Status>;

type FilterActions = SetQueryAction | SetStatusAction;

export interface FileterState {
  query: string,
  status: Status,
}

const setQueryActionCreator = (query: string): SetQueryAction => ({
  type: FilterActionType.SetQuery,
  payload: query,
});

const setStatusActionCreator = (status: Status): SetStatusAction => ({
  type: FilterActionType.SetStatus,
  payload: status,
});

export const FILTER_ACTIONS_CREATOR = {
  setQuery: setQueryActionCreator,
  setStatus: setStatusActionCreator,
};

const filterReducer = (
  filterState: FileterState = { query: '', status: 'all' },
  action: FilterActions,
): FileterState => {
  switch (action.type) {
    case FilterActionType.SetQuery:
      return {
        ...filterState,
        query: action.payload,
      };

    case FilterActionType.SetStatus:
      return {
        ...filterState,
        status: action.payload,
      };

    default:
      return filterState;
  }
};

export default filterReducer;
