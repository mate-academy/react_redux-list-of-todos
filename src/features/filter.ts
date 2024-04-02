type SetStatusAction = {
  type: 'filter/SET_STATUS';
  payload: string;
};

const setStatus = (status: string): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

export const actions = {
  setStatus,
  setQuery,
};

type Action = SetStatusAction | SetQueryAction;

const filterReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = { query: '', status: 'all' },
  action: Action,
) => {
  switch (action.type) {
    case 'filter/SET_STATUS':
      return {
        ...state,
        status: action.payload,
      };

    case 'filter/SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
