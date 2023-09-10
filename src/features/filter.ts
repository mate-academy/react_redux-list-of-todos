import { ShowTodos } from '../types/ShowTodos';

const enum Filter {
  querySET = 'filterQuery/SET',
  queryREMOVE = 'filterQuery/REMOVE',
  statusSET = 'filterStatus/SET',
}

type SetQueryAction = {
  type: Filter.querySET;
  payload: string;
};
type RemoveQueryAction = {
  type: Filter.queryREMOVE;
};
type SetStatusAction = {
  type: Filter.statusSET;
  payload: ShowTodos;
};

const setQuery = (query: string): SetQueryAction => ({
  type: Filter.querySET,
  payload: query,
});

const removeQuery = (): RemoveQueryAction => ({
  type: Filter.queryREMOVE,
});

const setStatus = (status: ShowTodos): SetStatusAction => ({
  type: Filter.statusSET,
  payload: status,
});

export const actions = { setQuery, removeQuery, setStatus };

type State = {
  query: string,
  status: ShowTodos,
};
type Action = SetQueryAction | RemoveQueryAction | SetStatusAction;

const filterReducer = (
  state: State = { query: '', status: ShowTodos.All },
  action: Action,
): State => {
  switch (action.type) {
    case 'filterQuery/SET':
      return { ...state, query: action.payload };

    case 'filterQuery/REMOVE':
      return { ...state, query: '' };

    case 'filterStatus/SET':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
