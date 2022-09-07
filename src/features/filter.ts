import { Action as BaseAction } from 'redux';

interface State {
  query: string,
  status: string,
}

const initialState: State = {
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
}

type SetQueryAction = Action<FilterActionType.SetQuery, string>;
type RemoveQueryAction = BaseAction<FilterActionType.RemoveQuery>;
type SetStatusAction = Action<FilterActionType.SetStatus, string>;

type FilterActions = SetQueryAction
| RemoveQueryAction
| SetStatusAction;

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

export const FILTER_ACTION_CREATORS = {
  setQuery,
  removeQuery,
  setStatus,
};

const filterReducer = (
  state: State = initialState,
  action: FilterActions,
): State => {
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

    default:
      return state;
  }
};

export default filterReducer;
