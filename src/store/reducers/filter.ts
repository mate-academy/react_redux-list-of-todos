type SetQueryAction = {
  type: 'SET_QUERY';
  payload: string;
};

type SetFilterAction = {
  type: 'SET_FILTER';
  payload: string;
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'SET_QUERY',
  payload: query,
});

const setFilter = (filter: string): SetFilterAction => ({
  type: 'SET_FILTER',
  payload: filter,
});

export const actions = { setQuery, setFilter };

type State = {
  query: string;
  status: string;
};

type Action = SetQueryAction | SetFilterAction;

const initialState = {
  query: '',
  status: 'All',
};

const filterReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };
    case 'SET_FILTER':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
