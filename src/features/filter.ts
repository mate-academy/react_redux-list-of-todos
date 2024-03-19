import { Status } from '../types/Status';
// import { Todo } from "../types/Todo";
// import { Todo } from "../types/Todo";

type TodosFilter = {
  query: string;
  status: Status;
};
type SetFilter = {
  type: 'filter/SET';
  payload: TodosFilter;
};

type State = TodosFilter;
type Action = SetFilter;

const setFilter = (filter: TodosFilter): SetFilter => {
  return {
    type: 'filter/SET',
    payload: filter,
  };
};

export const actions = { setFilter };

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'filter/SET':
      return { query: action.payload.query, status: action.payload.status };
    default:
      return state;
  }
};

export default filterReducer;
