import { Status } from '../types/Status';

type ChangeStatusAction = { type: 'filter/STATUS'; payload: Status };
type ChangeQueryAction = { type: 'filter/QUERY'; payload: string };

const changeFilterStatus = (value: Status): ChangeStatusAction => ({
  type: 'filter/STATUS',
  payload: value,
});

const changeFilterQuery = (value: string): ChangeQueryAction => ({
  type: 'filter/QUERY',
  payload: value,
});

export const actions = {
  changeFilterStatus,
  changeFilterQuery,
};

type State = {
  query: string;
  status: Status;
};

type Action = ChangeQueryAction | ChangeStatusAction;

const filterReducer = (
  state: State = { query: '', status: 'all' },
  action: Action,
) => {
  switch (action.type) {
    case 'filter/QUERY':
      return { ...state, query: action.payload };
    case 'filter/STATUS':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
