export type FilterPayloadType = 'all' | 'active' | 'completed';
type QueryPayloadType = string;

type SetFilterTypeAction = {
  type: 'filter/SET_TYPE';
  payload: FilterPayloadType;
};

type SetFilterQueryAction = {
  type: 'filter/SET_QUERY';
  payload: QueryPayloadType;
};

type ClearFilterQueryAction = {
  type: 'filter/CLEAR_QUERY';
};

const setFilter = (value: FilterPayloadType): SetFilterTypeAction => ({
  type: 'filter/SET_TYPE',
  payload: value,
});

const setQuery = (value: QueryPayloadType): SetFilterQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: value,
});

const clearQuery = (): ClearFilterQueryAction => ({
  type: 'filter/CLEAR_QUERY',
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
    case 'filter/SET_TYPE':
      return { ...state, status: action.payload };

    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };

    case 'filter/CLEAR_QUERY':
      return { ...state, query: '' };

    default:
      return state;
  }
};

export default filterReducer;
