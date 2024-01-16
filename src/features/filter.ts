const STATUS = 'filter/STATUS';
const QUERY = 'filter/QUERY';

type Status = 'all' | 'active' | 'completed';

type StatusesAction = {
  type: typeof STATUS;
  payload: Status;
};

type QueryAction = {
  type: typeof QUERY;
  payload: string;
};

const setStatus = (status: Status): StatusesAction => ({
  type: STATUS,
  payload: status,
});

const setQuery = (query: string): QueryAction => ({
  type: QUERY,
  payload: query,
});

type State = {
  query: string;
  status: Status;
};

const initialState: State = {
  query: '',
  status: 'all',
};

type Action = StatusesAction | QueryAction;

const filterReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case STATUS:
      return { ...state, status: action.payload };
    case QUERY:
      return { ...state, query: action.payload };
    default:
      return state;
  }
};

export const actions = { setQuery, setStatus };

export default filterReducer;
