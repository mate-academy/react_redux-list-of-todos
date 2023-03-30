type SetStatusAction = { type: 'STATUS/SET', payload: string };
type SetQueryAction = { type: 'QUERY/SET', payload: string };

const setStatus = (type: string): SetStatusAction => (
  { type: 'STATUS/SET', payload: type }
);
const setQuery = (search: string): SetQueryAction => (
  { type: 'QUERY/SET', payload: search }
);

type Action = SetStatusAction | SetQueryAction;

export const actions = { setStatus, setQuery };

type State = {
  query: string,
  status: string,
};

const filterReducer = (
  state: State = { query: '', status: 'all' },
  action: Action,
) => {
  switch (action.type) {
    case 'QUERY/SET':
      return {
        ...state,
        query: action.payload,
      };

    case 'STATUS/SET':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
