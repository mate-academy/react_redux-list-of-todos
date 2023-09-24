type FilterByQueryAction = {
  type: 'filter/QUERY';
  payload: string;
};

type FilterByStatusAction = {
  type: 'filter/STATUS';
  payload: string;
};

const filterByQuery = (query: string): FilterByQueryAction => {
  return {
    type: 'filter/QUERY',
    payload: query,
  };
};

const filterByStatus = (status: string): FilterByStatusAction => {
  return {
    type: 'filter/STATUS',
    payload: status,
  };
};

export const actions = {
  filterByQuery,
  filterByStatus,
};

type State = {
  query: string;
  status: string;
};

const initialState: State = {
  query: '',
  status: 'all',
};

type Action = FilterByQueryAction | FilterByStatusAction;

const filterReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'filter/QUERY':
      return {
        ...state,
        query: action.payload,
      };
    case 'filter/STATUS':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
