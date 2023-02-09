import { Status } from '../types/Status';

type FilterQueryAction = {
  type: 'query/SET',
  payload: string
};

type FilterStatusAction = {
  type: 'status/SET',
  payload: Status
};

const setFilterQuery = (query: string):FilterQueryAction => ({
  type: 'query/SET',
  payload: query,
});

const setFilterStatus = (status: Status):FilterStatusAction => ({
  type: 'status/SET',
  payload: status,
});

export const actions = { setFilterQuery, setFilterStatus };

type State = { query: string, status: Status };
type Action = FilterQueryAction | FilterStatusAction;

const initialState:State = { query: '', status: 'all' };

const filterReducer = (
  state: State = initialState,
  action: Action,
) => {
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
