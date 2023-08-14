import { ActionFilterType } from '../types/ActionFilterType';
import { Status } from '../types/Status';

type SetQueryAction = {
  type: ActionFilterType.QuerySet,
  payload: string,
};

type ClearQueryAction = {
  type: ActionFilterType.QueryClear,
};

type SetStatusAction = {
  type: ActionFilterType.StatusSet,
  payload: Status,
};

type Action = SetQueryAction
| SetStatusAction
| ClearQueryAction;

const setQueryFilter = (query: string): SetQueryAction => ({
  type: ActionFilterType.QuerySet,
  payload: query,
});

const clearQueryFilter = (): ClearQueryAction => ({
  type: ActionFilterType.QueryClear,
});

const setStatusFilter = (status: Status): SetStatusAction => ({
  type: ActionFilterType.StatusSet,
  payload: status,
});

type State = {
  query: string,
  status: Status,
};

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state = initialState,
  action: Action,
) => {
  switch (action.type) {
    case ActionFilterType.StatusSet:
      return { ...state, status: action.payload };

    case ActionFilterType.QuerySet:
      return { ...state, query: action.payload };

    case ActionFilterType.QueryClear:
      return { ...state, query: '' };

    default: return state;
  }
};

export const actions = { setQueryFilter, setStatusFilter, clearQueryFilter };

export default filterReducer;
