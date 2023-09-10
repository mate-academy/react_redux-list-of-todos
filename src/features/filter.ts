import { ShowTodos } from '../types/ShowTodos';

type SetQueryAction = {
  type: 'filterQuery/SET';
  payload: string;
};
type RemoveQueryAction = {
  type: 'filterQuery/REMOVE';
};
type SetStatusAction = {
  type: 'filterStatus/SET';
  payload: ShowTodos;
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filterQuery/SET',
  payload: query,
});

const removeQuery = (): RemoveQueryAction => ({
  type: 'filterQuery/REMOVE',
});

const setStatus = (status: ShowTodos): SetStatusAction => ({
  type: 'filterStatus/SET',
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
