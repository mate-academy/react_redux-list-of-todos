import { TodoStatus } from '../types/TodoStatus';

type SetStatusAction = { type: 'status/SET'; payload: TodoStatus };
type SetQueryAction = { type: 'query/SET'; payload: string };
type Action = SetStatusAction | SetQueryAction;

const setStatus = (status: TodoStatus): SetStatusAction => ({
  type: 'status/SET',
  payload: status,
});

export const changeQuery = (query: string): SetQueryAction => ({
  type: 'query/SET',
  payload: query,
});

export const actions = {
  setStatus,
  changeQuery,
};

const initialState = { status: TodoStatus.All, query: '' };

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'status/SET':
      return { ...state, status: action.payload };
    case 'query/SET':
      return { ...state, query: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
