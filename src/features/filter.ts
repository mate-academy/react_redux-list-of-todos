type SetStatusAction = { type: 'STATUS/SET', payload: string };
type SetQueryAction = { type: 'QUERY/SET', payload: string };

const setStatus = (type:string): SetStatusAction => {
  return { type: 'STATUS/SET', payload: type };
};

const setQuery = (search: string): SetQueryAction => {
  return { type: 'QUERY/SET', payload: search };
};

export const actions = { setStatus, setQuery };

type State = {
  query: string,
  status: string
};

type Action = SetStatusAction | SetQueryAction;

const filterReducer = (
  state: State = { query: '', status: 'all' },
  action: Action,
) => {
  switch (action.type) {
    case 'STATUS/SET':
      return {
        ...state,
        status: action.payload,
      };
    case 'QUERY/SET':
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
