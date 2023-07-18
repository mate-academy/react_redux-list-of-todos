import { Status } from '../types/Status';

type ChangeStatus = {
  type: 'changeStatus',
  payload: Status,
};

type ChangeQuery = {
  type: 'changeQuery',
  payload: string,
};

const changeStatus = (status: Status): ChangeStatus => ({
  type: 'changeStatus',
  payload: status,
});

const changeQuery = (query: string): ChangeQuery => ({
  type: 'changeQuery',
  payload: query,
});

type Action = ChangeQuery | ChangeStatus;

export const actions = {
  changeStatus,
  changeQuery,
};

type State = {
  query: string,
  status: Status,
};

const initialState: State = {
  query: '',
  status: Status.ALL,
};

const filterReducer = (
  state: State = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'changeStatus':
      return {
        ...state,
        status: action.payload,
      };
    case 'changeQuery':
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
