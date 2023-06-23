type FilterState = {
  query?: string,
  status?: string
};

type ActionQuery = {
  type: 'filter/QUERY',
  payload: FilterState,
};

type ActionSatus = {
  type: 'filter/STATUS',
  payload: FilterState,
};

type Actions = ActionSatus | ActionQuery;

const setQuery = (query: string) :ActionQuery => ({
  type: 'filter/QUERY',
  payload: { query },
});

const setStatus = (status: string) :ActionSatus => ({
  type: 'filter/STATUS',
  payload: { status },
});

export const actions = { setQuery, setStatus };

const firstQuery = { query: '', status: 'all' };

const filterReducer = (
  state: FilterState = firstQuery,
  action: Actions,
) => {
  switch (action.type) {
    case 'filter/QUERY':
      return {
        ...state,
        query: action.payload.query,
      };
    case 'filter/STATUS':
      return {
        ...state,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

export default filterReducer;
