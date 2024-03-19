type StatusTodos = {
  type: 'filter/STATUS';
  payload: string;
};

type QueryStatus = {
  type: 'filter/QUERY';
  payload: string;
};

type ClearQuery = {
  type: 'filter/CLEAR';
};

type Action = StatusTodos | QueryStatus | ClearQuery;

const statusFilter = (status: string): StatusTodos => ({
  type: 'filter/STATUS',
  payload: status,
});

const queryFilter = (query: string): QueryStatus => ({
  type: 'filter/QUERY',
  payload: query,
});

const clear = (): ClearQuery => ({
  type: 'filter/CLEAR',
});

export const actions = {
  statusFilter,
  queryFilter,
  clear,
};

type InitialState = {
  query: string;
  status: string;
};

const initialState: InitialState = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: InitialState = initialState,
  action: Action,
): InitialState => {
  switch (action.type) {
    case 'filter/STATUS':
      return { ...state, status: action.payload };
    case 'filter/QUERY':
      return { ...state, query: action.payload };
    case 'filter/CLEAR':
      return { ...state, query: '' };
    default:
      return state;
  }
};

export default filterReducer;
