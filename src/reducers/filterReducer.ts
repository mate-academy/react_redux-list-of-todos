type FilterAction = { type: 'filter/SET_QUERY'; payload: string };

const filter = (query: string): FilterAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

export const actions = { filter };

const filterReducer = (query = '', action: FilterAction) => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return action.payload;

    default:
      return query;
  }
};

export default filterReducer;
