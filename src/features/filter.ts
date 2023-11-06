import { Status } from '../types/Status';

type SetTodoStatus = {
  type: 'filterTodo/Status';
  payload: Status;
};

type SetTodoQuery = {
  type: 'filterTodo/Query';
  payload: Status;
};

     // eslint-disable-next-line
type resetTodoQuery = {
  type: 'filterTodo/ResetQuery';
};

const setStatus = (status: Status): SetTodoStatus => ({
  type: 'filterTodo/Status',
  payload: status,
});

const setQuery = (status: Status): SetTodoQuery => ({
  type: 'filterTodo/Query',
  payload: status,
});

const resetQuery = (): resetTodoQuery => ({
  type: 'filterTodo/ResetQuery',
});

export const actions = { setStatus, setQuery, resetQuery };

type State = {
  query: string,
  status: Status
};
type Action = SetTodoStatus | SetTodoQuery | resetTodoQuery;

const filterReducer = (
  state: State = {
    query: '',
    status: 'all',
  },
  action: Action,
): State => {
  switch (action.type) {
    case 'filterTodo/Status':
      return {
        ...state,
        status: action.payload,
      };

    case 'filterTodo/Query':
      return {
        ...state,
        query: action.payload,
      };

    case 'filterTodo/ResetQuery':
      return {
        ...state,
        query: '',
      };

    default:
      return state;
  }
};

export default filterReducer;
