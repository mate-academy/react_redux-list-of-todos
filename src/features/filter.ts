type SetQueryAction = {
  type: 'SET_QUERY';
  payload: string;
};

type SetStatusAction = {
  type: 'SET_STATUS';
  payload: string;
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'SET_QUERY',
  payload: query,
});

const setStatus = (status: string): SetStatusAction => ({
  type: 'SET_STATUS',
  payload: status,
});

export const actions = { setQuery, setStatus };

const initialState = {
  query: '',
  status: 'all',
};

type Action = SetQueryAction | SetStatusAction;
/* eslint-disable */
const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
