type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

type RemoveQueryAction = {
  type: 'filter/REMOVE_QUERY'
};

type SetStatusAction = {
  type: 'filter/STATUS';
  payload: string;
};

const setQuery = (text: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: text,
});

const removeQuery = (): RemoveQueryAction => ({
  type: 'filter/REMOVE_QUERY',
});

const setStatus = (status: string): SetStatusAction => ({
  type: 'filter/STATUS',
  payload: status,
});

export const actionsFilter = { setQuery, removeQuery, setStatus };

type StateFilter = {
  query: string;
  status: string;
};

type Action = SetQueryAction | RemoveQueryAction | SetStatusAction;

const initialState: StateFilter = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: StateFilter = initialState, action: Action,
): StateFilter => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };
    case 'filter/REMOVE_QUERY':
      return {
        ...state,
        query: '',
      };
    case 'filter/STATUS':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
