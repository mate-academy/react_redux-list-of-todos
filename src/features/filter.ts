import { TodoStatus } from '../types/TodoStatus';

type ChangeStatusAction = { type: 'filter/SET'; payload: TodoStatus };
type ChangeQueryAction = { type: 'query/SET' | 'query/CLEAR'; payload: string };
type Action = ChangeQueryAction | ChangeStatusAction;
type State = { query: string; status: TodoStatus };
const changeStatus = (status: TodoStatus): ChangeStatusAction => ({
  type: 'filter/SET',
  payload: status,
});

export const changeQuery = (query: string): ChangeQueryAction => ({
  type: 'query/SET',
  payload: query,
});

export const clearQuery = (): ChangeQueryAction => ({
  type: 'query/CLEAR',
  payload: '',
});
export const actions = { changeStatus, changeQuery, clearQuery };

const initialFilter: State = { query: '', status: TodoStatus.All };

const filterReducer = (state: State = initialFilter, action: Action) => {
  switch (action.type) {
    case 'filter/SET':
      return { ...state, status: action.payload };
    case 'query/SET':
      return { ...state, query: action.payload };
    case 'query/CLEAR':
      return { ...state, query: '' };
    default:
      return state;
  }
};

export default filterReducer;
