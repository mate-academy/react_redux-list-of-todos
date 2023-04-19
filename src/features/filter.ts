type Action = {
  type: 'filter/FILTER_QUERY' | 'filter/FILTER_STATUS';
  payload: string;
};

const setFilterQuery = (query: string): Action => ({
  type: 'filter/FILTER_QUERY',
  payload: query,
});

const setFilterStatus = (status: string): Action => ({
  type: 'filter/FILTER_STATUS',
  payload: status,
});

export const actions = { setFilterQuery, setFilterStatus };

const filterReducer = (
  state = { query: '', status: 'all' },
  action: Action,
) => {
  switch (action.type) {
    case 'filter/FILTER_QUERY':
      return { ...state, query: action.payload };

    case 'filter/FILTER_STATUS':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
