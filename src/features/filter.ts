import { Status } from '../types/Status';

type ChangeQueryAction = {
  type: 'query/CHANGE';
  payload: string;
};

type ChangeStatusAction = {
  type: 'status/CHANGE';
  payload: Status;
};

const changeQuery = (query: string): ChangeQueryAction => ({
  type: 'query/CHANGE',
  payload: query,
});

const changeStatus = (status: Status): ChangeStatusAction => ({
  type: 'status/CHANGE',
  payload: status,
});

export const actions = { changeQuery, changeStatus };

type State = {
  query: string;
  status: Status;
};

const defaultState: State = {
  query: '',
  status: 'all',
};

type Action = ChangeQueryAction | ChangeStatusAction;

const filterReducer = (
  state: State = defaultState,
  action: Action,
) => {
  switch (action.type) {
    case 'query/CHANGE':
      return {
        ...state,
        query: action.payload,
      };
    case 'status/CHANGE':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
