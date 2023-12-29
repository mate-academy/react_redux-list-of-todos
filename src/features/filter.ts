import { Status } from '../types/Status';

type SetStatus = { type: 'filter/SET_STATUS', payload: string };
type SetTodoAction = { type: 'filter/SET_QUERY', payload: string };

const setStatus = (status: string): SetStatus => (
  { type: 'filter/SET_STATUS', payload: status });

const setQuery = (query: string): SetTodoAction => (
  { type: 'filter/SET_QUERY', payload: query });

export const actions = { setQuery, setStatus };

type State = {
  query: string,
  status: string,
};

type Action = SetStatus | SetTodoAction;

const filterReducer = (
  state: State = {
    query: '',
    status: Status.ALL,
  },
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };
    case 'filter/SET_STATUS':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
