export type FilterPayloadType = 'all' | 'active' | 'completed';
type QueryPayloadType = string;

const SET_TYPE = 'filter/SET_TYPE';
const SET_QUERY = 'filter/SET_QUERY';
const CLEAR_QUERY = 'filter/CLEAR_QUERY';

type SetFilterTypeAction = {
  type: typeof SET_TYPE;
  payload: FilterPayloadType;
};

type SetFilterQueryAction = {
  type: typeof SET_QUERY;
  payload: QueryPayloadType;
};

type ClearFilterQueryAction = {
  type: typeof CLEAR_QUERY;
};

const setFilter = (value: FilterPayloadType): SetFilterTypeAction => ({
  type: SET_TYPE,
  payload: value,
});

const setQuery = (value: QueryPayloadType): SetFilterQueryAction => ({
  type: SET_QUERY,
  payload: value,
});

const clearQuery = (): ClearFilterQueryAction => ({
  type: CLEAR_QUERY,
});

export const actions = { setFilter, setQuery, clearQuery };
type Action =
  | SetFilterTypeAction
  | SetFilterQueryAction
  | ClearFilterQueryAction;

type StateType = {
  query: QueryPayloadType;
  status: FilterPayloadType;
};

const initialState: StateType = {
  query: '',
  status: 'all',
};

const filterReducer = (state = initialState, action: Action): StateType => {
  switch (action.type) {
    case SET_TYPE:
      return { ...state, status: action.payload };

    case SET_QUERY:
      return { ...state, query: action.payload };

    case CLEAR_QUERY:
      return { ...state, query: '' };

    default:
      return state;
  }
};

export default filterReducer;
