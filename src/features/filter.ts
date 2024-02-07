const defaultPayload = {
  query: '',
  status: 'all',
};

type FilterPayload = {
  query: string,
  status: string,
};

type FilterByQueryAction = {
  type: 'filter/QUERY';
  payload: FilterPayload;
};

type FilterByStatusAction = {
  type: 'filter/STATUS';
  payload: FilterPayload;
};

const setQuery = (
  query: string,
  otherParams: FilterPayload,
): FilterByQueryAction => ({
  type: 'filter/QUERY',
  payload: { ...otherParams, query },
});

const setStatus = (
  status: string,
  otherParams: FilterPayload,
): FilterByStatusAction => ({
  type: 'filter/STATUS',
  payload: { ...otherParams, status },
});

export const actions = { setQuery, setStatus };

const filterReducer = (
  state: FilterPayload = defaultPayload,
  action: FilterByQueryAction | FilterByStatusAction,
) => {
  switch (action.type) {
    case 'filter/QUERY':
      return action.payload;
    case 'filter/STATUS':
      return action.payload;
    default:
      return state;
  }
};

export default filterReducer;
