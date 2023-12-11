type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

type RemoveQueryAction = {
  type: 'filter/REMOVE_QUERY';
};

type SetStatusAction = {
  type: 'filter/SET_STATUS';
  payload: string;
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const removeQuery = (): RemoveQueryAction => ({ type: 'filter/REMOVE_QUERY' });

const setStatus = (status: string):SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

type State = {
  query: string,
  status: string,
};

type Action = SetQueryAction | RemoveQueryAction | SetStatusAction;

const filterReducer = (
  state: State = {
    query: '',
    status: 'all',
  },
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return {
        query: action.payload,
        status: state.status,
      };

    case 'filter/REMOVE_QUERY':
      return {
        query: '',
        status: state.status,
      };

    case 'filter/SET_STATUS':
      return {
        query: state.query,
        status: action.payload,
      };

    default:
      return state;
  }
};

export const actions = { setQuery, removeQuery, setStatus };

export default filterReducer;
