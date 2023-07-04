const initialState = {
  query: '',
  status: 'all',
};

type QueryAction = {
  type: 'filter/QUERY';
  payload: string;
};

type StatusAction = {
  type: 'filter/STATUS';
  payload: string;
};

type Action = QueryAction | StatusAction;

const setQuery = (query: string): QueryAction => ({
  type: 'filter/QUERY',
  payload: query,
});

const setStatus = (status: string): StatusAction => ({
  type: 'filter/STATUS',
  payload: status,
});

export const actions = { setQuery, setStatus };

const filterReducer = (state = initialState, action: Action) => {
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
