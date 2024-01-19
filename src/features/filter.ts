type RemoveQueryAction = { type: 'query/REMOVE' };
type RemoveStatusAction = { type: 'status/REMOVE' };

type SetQueryAction = {
  type: 'query/SET';
  payload: string;
};

type SetStatusAction = {
  type: 'status/SET';
  payload: string;
};

const removeStatus = (): RemoveStatusAction => ({ type: 'status/REMOVE' });

const setQuery = (query: string): SetQueryAction => ({
  type: 'query/SET',
  payload: query,
});

const setStatus = (status: string): SetStatusAction => ({
  type: 'status/SET',
  payload: status,
});

export const actions = {
  setQuery, removeStatus, setStatus,
};

type State = {
  query: string | null,
  status: string,
};

type Action = SetQueryAction
| RemoveQueryAction
| SetStatusAction
| RemoveStatusAction;

const filterReducer = (
  state: State = { query: '', status: 'all' },
  action: Action,
): State => {
  switch (action.type) {
    case 'query/SET':
      return {
        query: action.payload,
        status: state.status,
      };
    case 'status/REMOVE':
      return {
        query: state.query,
        status: 'all',
      };
    case 'status/SET':
      return {
        query: state.query,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
