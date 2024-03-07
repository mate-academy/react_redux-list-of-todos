const setStatus = (status: string): SetStatusAction => ({
  type: 'filter/STATUS',
  payload: status,
});
const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/QUERY',
  payload: query,
});

type SetStatusAction = {
  type: 'filter/STATUS';
  payload: string;
};

type SetQueryAction = {
  type: 'filter/QUERY';
  payload: string;
};

type Action = SetStatusAction | SetQueryAction;

export const actions = {
  setStatus,
  setQuery,
};

const filterReducer = (
  state = { status: 'all', query: '' },
  action: Action,
) => {
  switch (action.type) {
    case 'filter/STATUS':
      return {
        ...state,
        status: action.payload,
      };
    case 'filter/QUERY':
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
