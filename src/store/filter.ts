type SetStatusAction = {
  type: 'filter/SET_STATUS';
  payload: string;
};

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string,
};

type Action = (
  SetStatusAction
  | SetQueryAction
);

type FilterState = {
  status: string,
  query: string,
};

const initialState: FilterState = {
  status: '',
  query: '',
};

const filterReducer = (
  state = initialState,
  action: Action,
): FilterState => {
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

export const actions = {
  setStatus: (status: string): SetStatusAction => (
    {
      type: 'filter/SET_STATUS',
      payload: status,
    }
  ),

  setQuery: (query: string): SetQueryAction => (
    {
      type: 'filter/SET_QUERY',
      payload: query,
    }
  ),
};

export default filterReducer;
