const filterTodos = (
  query: string,
  status: string,
): FilterTodosAction => {
  return {
    type: 'FILTER_TODOS',
    payload: {
      query,
      status,
    },
  };
};

type FilterTodosAction = {
  type: 'FILTER_TODOS';
  payload: {
    query: string,
    status: string,
  }
};

export const actions = { filterTodos };

const initialState = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state = initialState,
  action: FilterTodosAction,
) => {
  switch (action.type) {
    case 'FILTER_TODOS':
      return {
        ...state,
        query: action.payload.query,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

export default filterReducer;
