const STATUS = 'filter/STATUS';
const QUERY = 'filter/QUERY';

type Status = 'all' | 'active' | 'completed';

type StatusAction = {
  type: 'filter/STATUS',
  payload: Status
};

type QueryAction = {
  type: 'filter/QUERY',
  payload: Status
};

const setStatus = (status: Status) => ({
  type: STATUS,
  payload: status,
});

const setQuery = (query: string) => ({
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

type Action = StatusAction | QueryAction;

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
