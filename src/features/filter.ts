import { Action as BaseAction } from 'redux';

const initialState = {
  query: '',
  status: 'all',
};

interface Action<T, P> extends BaseAction<T> {
  payload: P,
}

export enum FilterActionType {
  SetQuery = 'query/SET',
  RemoveQuery = 'query/REMOVE',
  SetStatus = 'status/SET',
  RemoveStatus = 'status/REMOVE',
}

type SetQueryAction = Action<FilterActionType.SetQuery, string>;
type RemoveQueryAction = BaseAction<FilterActionType.RemoveQuery>;
type SetStatusAction = Action<FilterActionType.SetStatus, string>;
type RemoveStatusAction = BaseAction<FilterActionType.RemoveStatus>;

type FilterActions = SetQueryAction
| RemoveQueryAction
| SetStatusAction
| RemoveStatusAction;

const setQuery = (query: string): SetQueryAction => ({
  type: FilterActionType.SetQuery,
  payload: query,
});

const removeQuery = (): RemoveQueryAction => ({
  type: FilterActionType.RemoveQuery,
});

const setStatus = (status: string): SetStatusAction => ({
  type: FilterActionType.SetStatus,
  payload: status,
});

const removeStatus = (): RemoveStatusAction => ({
  type: FilterActionType.RemoveStatus,
});

export const FILTER_ACTIONS = {
  setQuery,
  removeQuery,
  setStatus,
  removeStatus,
};

const filterReducer = (
  state = initialState,
  action: FilterActions,
) => {
  switch (action.type) {
    case FilterActionType.SetQuery:
      return {
        ...state,
        query: action.payload,
      };

    case FilterActionType.RemoveQuery:
      return {
        ...state,
        query: '',
      };

    case FilterActionType.SetStatus:
      return {
        ...state,
        status: action.payload,
      };

    case FilterActionType.RemoveStatus:
      return {
        ...state,
        status: 'all',
      };

    default:
      return state;
  }
};

export default filterReducer;
