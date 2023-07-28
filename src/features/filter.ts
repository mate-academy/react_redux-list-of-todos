import { Status } from '../types';

type ChangeQueryAction = {
  type: 'filter/SET_QUERY',
  payload: string;
};

type ChangeStatusAction = {
  type: 'filter/SET_STATUS',
  payload: Status;
};

type Action = ChangeQueryAction | ChangeStatusAction;
type State = {
  query: string;
  status: Status;
};

const changeQuery = (query: string): ChangeQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const changeStatus = (status: Status): ChangeStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

export const actions = { changeQuery, changeStatus };

const filterReducer = (
  state: State = { query: '', status: Status.All },
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/SET_STATUS':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
