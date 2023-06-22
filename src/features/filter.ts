import { Status } from '../types/Status';

export enum FilterActionType {
  setQuery = 'query/SET',
  setStatus = 'status/SET',
}

type SetQuery = {
  type: FilterActionType.setQuery;
  payload: string;
};

type SetStatus = {
  type: FilterActionType.setStatus;
  payload: Status;
};

const setQuery = (query: string): SetQuery => ({
  type: FilterActionType.setQuery,
  payload: query,
}
);

const setStatus = (status: Status): SetStatus => ({
  type: FilterActionType.setStatus,
  payload: status,
});

type State = {
  query: string;
  status: Status;
};

type Action = SetQuery | SetStatus;

const initialState = {
  query: '',
  status: 'all' as Status,
};

const filterReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case FilterActionType.setQuery:
      return { ...state, query: action.payload };
    case FilterActionType.setStatus:
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export const actions = { setQuery, setStatus };
export default filterReducer;
