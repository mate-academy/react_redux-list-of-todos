import { Status } from '../types/Status';

type FliterQueryAction = {
  type: 'query/SET',
  payload: string,
};

type FliterStatusAction = {
  type: 'status/SET',
  payload: Status,
};

const setFilterQuery = (query: string): FliterQueryAction => ({
  type: 'query/SET',
  payload: query,
});

const setFilterStatus = (status: Status): FliterStatusAction => ({
  type: 'status/SET',
  payload: status,
});

export const actions = { setFilterQuery, setFilterStatus };

type State = { query: string, status: Status };
type Action = FliterQueryAction | FliterStatusAction;

const intialState: State = { query: '', status: 'all' };

const filterReducer = (
  state: State = intialState,
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
