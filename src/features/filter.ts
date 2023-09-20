type FilterQueryAction = {
  type: 'filter/Query',
  payload: string,
};

const setFilterQuery = (query: string): FilterQueryAction => ({
  type: 'filter/Query',
  payload: query,
});

type FilterStatusAction = {
  type: 'filter/Status',
  payload: string,
};

const setFilterStatus = (status: string): FilterStatusAction => ({
  type: 'filter/Status',
  payload: status,
});

export const actions = { setFilterQuery, setFilterStatus };

type State = {
  query: string,
  status: string,
};

type Action = FilterQueryAction | FilterStatusAction;

const filterReducer = (
  state: State = {
    query: '',
    status: 'all',
  },

  action: Action,
) => {
  switch (action.type) {
    case 'filter/Query':
      return {
        ...state,
        query: action.payload,
      };
    case 'filter/Status':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
