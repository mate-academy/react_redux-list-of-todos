type ActionQuery = { type: 'filter/QUERY'; payload: string };

export const filterQuery = (payload: string): ActionQuery => ({
  type: 'filter/QUERY',
  payload,
});

const queryReducer = (state = '', action: ActionQuery) => {
  switch (action.type) {
    case 'filter/QUERY':
      return action.payload;
    default:
      return state;
  }
};

export default queryReducer;
