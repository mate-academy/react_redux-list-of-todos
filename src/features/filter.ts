const SET_QUERY = 'filter/SET_QUERY';
const CLEAR_QUERY = 'filter/CLEAR_QUERY';
const SET_STATUS = 'filter/SET_STATUS';
const REMOVE_FILTER = 'filter/REMOVE';

type RemoveFilterAction = {
  type: typeof REMOVE_FILTER,
};

type Query = {
  query: string,
};

type Status = {
  status: 'all' | 'completed' | 'active',
};

type SetQueryAction = {
  type: typeof SET_QUERY,
  payload: Query,
};
type ClearQueryAction = {
  type: typeof CLEAR_QUERY,
};
type SetStatusAction = {
  type: typeof SET_STATUS,
  payload: Status,
};

const removeFilter = (): RemoveFilterAction => ({
  type: REMOVE_FILTER,
});

const setQuery = (query: Query): SetQueryAction => ({
  type: SET_QUERY,
  payload: query,
});

const clearQuery = (): ClearQueryAction => ({
  type: CLEAR_QUERY,
});

const setStatus = (status: Status): SetStatusAction => ({
  type: SET_STATUS,
  payload: status,
});

export const actions = {
  setQuery, clearQuery, setStatus, removeFilter,
};

const initialState = {
  query: '',
  status: 'all',
};

type Action = SetQueryAction
| ClearQueryAction
| SetStatusAction
| RemoveFilterAction;

type State = {
  query: string,
  status: string,
};

const filterReducer = (
  state = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case SET_QUERY:
      return {
        status: state.status,
        query: action.payload.query,
      };
    case CLEAR_QUERY:
      return {
        status: state.status,
        query: '',
      };
    case SET_STATUS:
      return {
        status: action.payload.status,
        query: state.query,
      };
    case REMOVE_FILTER:
      return initialState;
    default:
      return state;
  }
};

export default filterReducer;
