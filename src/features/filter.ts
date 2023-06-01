import { Status } from '../types/Status';
import { State } from '../types/State';

type FilterTodoAction = {
  type: 'filterTodo/SET';
  payload: Status;
};

type SetQueryAction = {
  type: 'query/SET';
  payload: string;
};

type Action = SetQueryAction | FilterTodoAction;

const filterTodo = (value: Status):FilterTodoAction => ({
  type: 'filterTodo/SET',
  payload: value,
});

const setQuery = (value: string):SetQueryAction => ({
  type: 'query/SET',
  payload: value,
});

const initialState = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: State = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'query/SET':
      return {
        ...state,
        query: action.payload,
      };
    case 'filterTodo/SET':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export const actions = { filterTodo, setQuery };
export default filterReducer;
