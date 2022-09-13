type SetQuery = {
  type: 'filter/SET_QUERY';
  payload: string;
};

type SetFilter = {
  type: 'filter/SET_FILTER';
  payload: string;
};

type Action = SetQuery | SetFilter;

type State = {
  query: string;
  status: string;
};

const setQuery = (query: string): SetQuery => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setFilter = (filter: string): SetFilter => ({
  type: 'filter/SET_FILTER',
  payload: filter,
});

export const actions = { setQuery, setFilter };

const initialState: State = {
  query: '',
  status: 'All',
};

export const filterReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };
    case 'filter/SET_FILTER':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};
