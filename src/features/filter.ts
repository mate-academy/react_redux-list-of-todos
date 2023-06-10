import { Status } from '../types/Status';

export enum ActionType {
  SetQuery = 'filter/QUERY',
  SetStatus = 'filter/Status',
}

type SetQueryAction = { type: ActionType.SetQuery, payload: string };
type SetStatusAction = { type: ActionType.SetStatus, payload: Status };
type Action = SetQueryAction | SetStatusAction;

const setQuery = (value: string): SetQueryAction => ({
  type: ActionType.SetQuery,
  payload: value,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: ActionType.SetStatus,
  payload: status,
});

export const actions = { setQuery, setStatus };

const filterReducer = (
  filter = {
    query: '',
    status: Status.all,
  },
  action: Action,
) => {
  switch (action.type) {
    case ActionType.SetQuery:
      return { ...filter, query: action.payload };

    case ActionType.SetStatus:
      return { ...filter, status: action.payload };

    default:
      return filter;
  }
};

export default filterReducer;
