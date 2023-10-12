const SET_QUERY = 'filter/SET_QUERY';
const SET_STATUS = 'filter/SET_STATUS';

interface FilterState {
  query: string;
  status: string;
}

const initialState: FilterState = {
  query: '',
  status: 'all',
};

interface SetQueryAction {
  type: 'filter/SET_QUERY';
  payload: string;
}

interface SetStatusAction {
  type: 'filter/SET_STATUS';
  payload: string;
}

type FilterAction = SetQueryAction | SetStatusAction;

// Action creators
const setQuery = (query: string) => ({
  type: SET_QUERY,
  payload: query,
});

const setStatus = (status: string) => ({
  type: SET_STATUS,
  payload: status,
});

export const actions = {
  setQuery,
  setStatus,
};

const filterReducer = (state: FilterState = initialState,
  action: FilterAction) => {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
