import { Status } from '../types/Status';

type StatusAction = { type : 'todos/STATUS', payload: Status };
type QueryAction = { type : 'todos/QUERY', payload: string };

const statusTodos = (status: Status): StatusAction => ({
  type: 'todos/STATUS',
  payload: status,
});

const queryTodos = (query: string): QueryAction => ({
  type: 'todos/QUERY',
  payload: query,
});

type Action = StatusAction | QueryAction;

type State = {
  query: string;
  status: Status;
};

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: State = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'todos/STATUS':
      return { ...state, status: action.payload };
    case 'todos/QUERY':
      return { ...state, query: action.payload };

    default:
      return state;
  }
};

export const actions = { statusTodos, queryTodos };
export default filterReducer;
