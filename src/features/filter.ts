enum Status {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

interface StateType {
  query: string;
  status: string;
}

const initialState = {
  query: '',
  status: Status.All,
};

type QueryAction = {
  type: 'filterTodo/QUERY';
  payload: string;
};

const queryFilter = (value: string): QueryAction => ({
  type: 'filterTodo/QUERY',
  payload: value,
});

type StatusAction = {
  type: 'filterTodo/STATUS';
  payload: string;
};

const statusFilter = (value: string): StatusAction => ({
  type: 'filterTodo/STATUS',
  payload: value,
});

type Action = QueryAction | StatusAction;

const filterReducer = (state = initialState, action: Action): StateType => {
  switch (action.type) {
    case 'filterTodo/STATUS':
      return {
        ...state,
        status: action.payload,
      };
    case 'filterTodo/QUERY':
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export const actions = { queryFilter, statusFilter };

export default filterReducer;
