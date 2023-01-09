// eslint-disable-next-line import/no-cycle
import { FilterActions } from '../app/store';

export enum Statuses {
  All = 'all',
  Completed = 'completed',
  Active = 'active',
}

type SetQueryAction = {
  type: FilterActions.SetQuery;
  payload: string;
};

type SetStatusAction = {
  type: FilterActions.SetStatus;
  payload: string;
};

const setQuery = (query: string): SetQueryAction => ({
  type: FilterActions.SetQuery,
  payload: query,
});

const setStatus = (status: string): SetStatusAction => ({
  type: FilterActions.SetStatus,
  payload: status,
});

export const actions = { setQuery, setStatus };

type State = {
  query: string,
  status: string,
};

type Action = SetStatusAction | SetQueryAction;

const filterReducer = (
  state: State = {
    query: '',
    status: Statuses.All,
  },
  action: Action,
) : State => {
  switch ((action.type)) {
    case FilterActions.SetQuery: {
      return {
        ...state,
        query: action.payload,
      };
    }

    case FilterActions.SetStatus: {
      return <State>{
        ...state,
        status: action.payload,
      };
    }

    default:
      return state;
  }
};

export default filterReducer;
