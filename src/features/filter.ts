import { Status } from '../types/Status';

type ChangeQueryAction = {
  type: 'query/CHANGE',
  payload: string,
};

const changeQuery = (query: string): ChangeQueryAction => ({
  type: 'query/CHANGE',
  payload: query,
});

type ChangeStatusAction = {
  type: 'status/CHANGE',
  payload: Status,
};

const changeStatus = (status: Status): ChangeStatusAction => ({
  type: 'status/CHANGE',
  payload: status,
});

export const actions = { changeQuery, changeStatus };

type Action = ChangeQueryAction | ChangeStatusAction;

type State = {
  query: string,
  status: Status,
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
    case 'query/CHANGE':
      return { ...state, query: action.payload };

    case 'status/CHANGE':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
