import { Status } from '../types/Status';

enum FilterActionTypes {
  SET_QUERY = 'filter/query/SET',
  SET_STATUS = 'filter/status/SET',
}

type SetQueryAction = {
  type: FilterActionTypes.SET_QUERY,
  payload: string,
};

const setQuery = (payload: string): SetQueryAction => ({
  type: FilterActionTypes.SET_QUERY,
  payload,
});

type SetStatusAction = {
  type: FilterActionTypes.SET_STATUS,
  payload: Status,
};

const setStatus = (payload: Status): SetStatusAction => ({
  type: FilterActionTypes.SET_STATUS,
  payload,
});

export const actions = { setQuery, setStatus };

type Action = SetQueryAction | SetStatusAction;
type State = {
  query: string,
  status: Status,
};

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case FilterActionTypes.SET_QUERY:
      return { ...state, query: action.payload };

    case FilterActionTypes.SET_STATUS:
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
