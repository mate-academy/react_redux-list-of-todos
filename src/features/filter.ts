const initialState = {
  query: '',
  status: 'all',
};

type QueryAction = {
  type: 'filter/QUERY',
  payload: string,
};

type StatusAction = {
  type: 'filter/STATUS',
  payload: string,
};

const setQuery = (query: string): QueryAction => ({
  type: 'filter/QUERY',
  payload: query,
});

const setStatus = (status: string): StatusAction => ({
  type: 'filter/STATUS',
  payload: status,
});

type FilterAction = QueryAction | StatusAction;

type State = {
  query: string,
  status: string,
};

const filterReducer = (
  state = initialState,
  action: FilterAction,
): State => {
  switch (action.type) {
    case 'filter/QUERY':
      return {
        ...state,
        query: action.payload,
      };
    case 'filter/STATUS':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
export const actions = { setQuery, setStatus };
