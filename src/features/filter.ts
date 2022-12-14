type Filter = { query: string; status: string; };
type SetQueryAction = { type: 'filter/SET_QUERY'; payload: string; };
type SetStatusAction = { type: 'filter/SET_STATUS'; payload: string; };

type Action = SetQueryAction | SetStatusAction;

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setStatus = (status: string): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

const startFilter = { query: '', status: 'all' };

const filterReducer = (
  filter: Filter = startFilter,
  action: Action,
): Filter => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return { ...filter, query: action.payload };

    case 'filter/SET_STATUS':
      return { ...filter, status: action.payload };

    default:
      return filter;
  }
};

export default filterReducer;
export const actions = { setQuery, setStatus };
