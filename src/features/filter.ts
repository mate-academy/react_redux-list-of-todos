type QueryType = 'filtration/SET';

type Query = {
  type: QueryType
  query: string
  status: string
};

export const setQuery = (query: string, status: string): Query => ({
  type: 'filtration/SET',
  query,
  status,
});

export const actions = { setQuery };

interface State {
  query: string,
  status: string,
}

type Action = Query;

const initialState = {
  query: '',
  status: 'all',
};

const filterReducer = (state: State = initialState, action: Action): State => {
  if (action.type === 'filtration/SET') {
    return {
      query: action.query,
      status: action.status,
    };
  }

  return state;
};

export default filterReducer;
