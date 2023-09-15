import { Status } from '../types/Status';

type FilterAction = {
  type: 'filterTodos/STATUS';
  payload: Status;
};

type FindAction = {
  type: 'filterTodos/QUERY';
  payload: string;
};

const filterTodos = (status: Status): FilterAction => ({
  type: 'filterTodos/STATUS',
  payload: status,
});

const findTodos = (query: string): FindAction => ({
  type: 'filterTodos/QUERY',
  payload: query,
});

export const actions = { filterTodos, findTodos };

type Action = FilterAction | FindAction;

type State = {
  query: string,
  status: Status,
};

const initState = {
  query: '',
  status: Status.ALL,
};

const filterReducer = (
  state = initState,
  action: Action,
): State => {
  switch (action.type) {
    case 'filterTodos/STATUS':
      return {
        ...state,
        status: action.payload,
      };

    case 'filterTodos/QUERY':
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
