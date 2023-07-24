import { StatusFilter } from '../types/StatusFilter';

type SetFilterAction = {
  type: 'statusFilter/SET';
  payload: StatusFilter;
};

type SetQueryAction = {
  type: 'todoQuery/SET';
  payload: string;
};

type ClearQueryAction = {
  type: 'todoQuery/CLEAR';
};

const setTodoFilter = (
  todoFilter: StatusFilter,
): SetFilterAction => ({
  type: 'statusFilter/SET',
  payload: todoFilter,
});

const setTodoQuery = (
  query: string,
): SetQueryAction => ({
  type: 'todoQuery/SET',
  payload: query,
});

const clearTodoQuery = (): ClearQueryAction => ({
  type: 'todoQuery/CLEAR',
});

export const actions = {
  setTodoFilter,
  setTodoQuery,
  clearTodoQuery,
};

type State = {
  query: string;
  status: StatusFilter;
};

const initialState: State = {
  query: '',
  status: StatusFilter.All,
};

type Action = SetFilterAction | SetQueryAction | ClearQueryAction;

const filterReducer = (
  state: State = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'statusFilter/SET':
      return {
        ...state,
        status: action.payload,
      };

    case 'todoQuery/SET':
      return {
        ...state,
        query: action.payload,
      };

    case 'todoQuery/CLEAR':
      return {
        ...state,
        query: '',
      };

    default:
      return state;
  }
};

export default filterReducer;
