import { Status } from '../types/Status';

type FilterByQueryAction = {
  type: 'query/SET',
  payload: string,
};

type FilterByStatusAction = {
  type: 'status/SET',
  payload: Status,
};

const setQuery = (payload: string): FilterByQueryAction => ({
  type: 'query/SET',
  payload,
});

const setStatus = (payload: Status): FilterByStatusAction => ({
  type: 'status/SET',
  payload,
});

export const actions = { setQuery, setStatus };

type Action = FilterByQueryAction | FilterByStatusAction;
type State = {
  query: string
  status: Status
};

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: State = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'query/SET':
      return { ...state, query: action.payload };

    case 'status/SET':
      return { ...state, status: action.payload };

    default: return state;
  }
};

export default filterReducer;
