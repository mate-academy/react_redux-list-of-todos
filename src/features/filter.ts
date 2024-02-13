import { Status } from '../types/Status';

enum ActionType {
  ChangeQuery = 'filter/CHANGE_QUERY',
  ChangeStatus = 'filter/CHANGE_STATUS',
  DeleteQuery = 'filter/DELETE',
}

type QueryAction = { type: ActionType.ChangeQuery, payload: string };
type StatusAction = { type: ActionType.ChangeStatus, payload: string };
type DeleteQueryAction = { type: ActionType.DeleteQuery };

type Action = QueryAction | StatusAction | DeleteQueryAction;

const changeQuery = (value: string) => (
  { type: ActionType.ChangeQuery, payload: value }
);
const changeStatus = (value: string) => (
  { type: ActionType.ChangeStatus, payload: value }
);

const deleteQuery = (value: string) => (
  { type: ActionType.DeleteQuery, payload: value }
);

export interface Filter {
  query: string,
  status: Status,
}

const initialFilter: Filter = { query: '', status: Status.all };

const filterReducer = (
  filter: Filter = initialFilter,
  action: Action,
) => {
  switch (action.type) {
    case ActionType.ChangeQuery:
      return { ...filter, query: action.payload || '' };

    case ActionType.ChangeStatus:
      return { ...filter, status: action.payload || Status.all };

    case ActionType.DeleteQuery:
      return { ...filter, query: '' };

    default:
      return filter;
  }
};

export const actions = { changeQuery, changeStatus, deleteQuery };

export default filterReducer;
