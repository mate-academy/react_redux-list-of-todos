import { Status } from '../types/Status';

type SetStatusAction = {
  type: 'status/SET';
  payload: Status;
};

type ActionQuery = {
  type: 'query/SET';
  payload: string;
};

// type ActionDone = {
//   type: 'filter/done';
//   payload: Status;
// };

type ActionClear = {
  type: 'query/CLEAR';
};

type Action = ActionQuery | SetStatusAction | ActionClear;

const QUERY = (query: string): ActionQuery => ({
  type: 'query/SET',
  payload: query,
});

const DONE = (filterBy: Status): SetStatusAction => ({
  type: 'status/SET',
  payload: filterBy,
});

const CLEAR = () => ({
  type: 'query/CLEAR',
});

const initialState = {
  query: '',
  status: 'all',
};

export const actions = { QUERY, DONE, CLEAR };

const filterReducer = (state = initialState, action: Action) => {
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
    case 'query/CLEAR':
      return {
        ...state,
        query: '',
      };
    default:
      return state;
  }
};

export default filterReducer;
