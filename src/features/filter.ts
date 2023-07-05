import { Status } from '../types/Status';
import { FilterAction } from '../types/FilterAction';

type SetStatusAction = { type: FilterAction.SetStatus, payload: Status };
type SetQueryAction = { type: FilterAction.SetQuery, payload: string };
type ClearQueryAction = { type: FilterAction.ClearQuery };

type Action = SetStatusAction | SetQueryAction | ClearQueryAction;

const setStatus = (status: Status): SetStatusAction => ({
  type: FilterAction.SetStatus,
  payload: status,
});

const setQuery = (query: string): SetQueryAction => ({
  type: FilterAction.SetQuery,
  payload: query,
});

const clearQuery = (): ClearQueryAction => ({
  type: FilterAction.ClearQuery,
});

export const actions = { setStatus, setQuery, clearQuery };

type State = {
  status: Status,
  query: string;
};

const initialState = {
  status: Status.ALL,
  query: '',
};

const filterReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/setStatus':
      return {
        ...state,
        status: action.payload,
      };

    case 'filter/setQuery':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/clearQuery':
      return {
        ...state,
        query: '',
      };

    default:
      return state;
  }
};

export default filterReducer;
