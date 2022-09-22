interface State {
  query: string,
  status: string,
}

const initialState: State = {
  query: '',
  status: 'all',
};

interface SetQueryAction {
  type: 'query/SET',
  payload: string,
}

interface SetStatusAction {
  type: 'status/SET',
  payload: string,
}

type Action = SetQueryAction | SetStatusAction;

const setQuery = (query: string): SetQueryAction => ({
  type: 'query/SET',
  payload: query,
});

const setStatus = (status: string): SetStatusAction => ({
  type: 'status/SET',
  payload: status,
});

export const actions = { setQuery, setStatus };

const filterReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case 'query/SET':
      return {
        ...state,
        query: action.payload,
      };
    case 'status/SET':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
