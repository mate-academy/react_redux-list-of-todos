type QueryFilterAction = {
  type: 'queryFilter/SET';
  payload: string;
};

const setQueryFilter = (query: string): QueryFilterAction => ({
  type: 'queryFilter/SET',
  payload: query,
});

type StatusFilterAction = {
  type: 'statusFilter/SET';
  payload: string;
};

const setStatusFilter = (status: string): StatusFilterAction => ({
  type: 'statusFilter/SET',
  payload: status,
});

export const actions = { setQueryFilter, setStatusFilter };

type State = {
  query: string,
  status: string,
};
type Action = StatusFilterAction | QueryFilterAction;

const initialState = {
  query: '',
  status: 'all',
};
const filterReducer = (
  state: State = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'statusFilter/SET':
      return { ...state, status: action.payload };
    case 'queryFilter/SET':
      return { ...state, query: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
