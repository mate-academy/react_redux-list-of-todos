type FilterQueryAction = { type: 'filter/SET_QUERY', payload: string };
type FilterStatusAction = { type: 'filter/SET_STATUS', payload: string };
type FilterResetAction = { type: 'filter/RESET_QUERY' };

const setFilterQuery = (query: string): FilterQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});
const setFilterStatus = (status: string): FilterStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});
const resetQuery = (): FilterResetAction => ({
  type: 'filter/RESET_QUERY',
});

export const actions = { setFilterQuery, setFilterStatus, resetQuery };

type FilterState = {
  query: string,
  status: string,
};

type Action = FilterQueryAction | FilterStatusAction | FilterResetAction;

const filterReducer = (
  state: FilterState = { query: '', status: 'all' },
  action: Action,
): FilterState => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };

    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };

    case 'filter/RESET_QUERY':
      return { ...state, query: '' };

    default:
      return state;
  }
};

export default filterReducer;
