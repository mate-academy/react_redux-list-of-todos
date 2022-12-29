import { Status } from '../types/Status';

type SetGroupAction = {
  type: 'filter/SET_GROUP';
  payload: Status;
};

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

const setTodoGroup = (status: Status): SetGroupAction => ({
  type: 'filter/SET_GROUP',
  payload: status,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

export const actions = { setTodoGroup, setQuery };

type Action = SetGroupAction | SetQueryAction;

export type State = {
  query: string;
  groupBy: Status;
};

const initialState = {
  query: '',
  groupBy: 'all',
};

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/SET_GROUP':
      return { ...state, groupBy: action.payload };
    case 'filter/SET_QUERY':
      return { ...state, query: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
