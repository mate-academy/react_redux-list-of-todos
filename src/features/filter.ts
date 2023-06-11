import { Status } from '../types/Status';

export enum FilterActionTypes {
  SetQuery = 'filter/QUERY',
  SetStatus = 'filter/Status',
}

type SetQueryAction = { type: FilterActionTypes.SetQuery, payload: string };
type SetStatusAction = { type: FilterActionTypes.SetStatus, payload: Status };
type Action = SetQueryAction | SetStatusAction;

const setQuery = (value: string): SetQueryAction => ({
  type: FilterActionTypes.SetQuery,
  payload: value,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: FilterActionTypes.SetStatus,
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
    case FilterActionTypes.SetQuery:
      return { ...filter, query: action.payload };

    case FilterActionTypes.SetStatus:
      return { ...filter, status: action.payload };

    default:
      return filter;
  }
};

export default filterReducer;
