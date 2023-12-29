// import { filterTodosByStatus } from '../helpers/filterTodosByStatus';
import { Status } from '../types/Status';
// import { Todo } from '../types/Todo';

type FilterByStatusAction = { type: 'filter/STATUS', payload: Status };
type FilterByQueryAction = { type: 'filter/QUERY', payload: string };

const filterByStatus = (status: Status): FilterByStatusAction => (
  {
    type: 'filter/STATUS',
    payload: status,
  }
);

const filterByQuery = (query: string): FilterByQueryAction => (
  {
    type: 'filter/QUERY',
    payload: query,
  }
);

export const actions = { filterByStatus, filterByQuery };

type State = {
  query: string,
  status: Status
};
type Action = FilterByStatusAction | FilterByQueryAction;

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/QUERY': {
      return {
        ...state,
        query: action.payload,
      };
    }

    case 'filter/STATUS': {
      return {
        ...state,
        status: action.payload,
      };
    }

    default:
      return state;
  }
};

export default filterReducer;
