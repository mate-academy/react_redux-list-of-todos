import { Status } from '../types/Status';

type ChangeQuery = { type: 'filter/changeQuery', payload: string };
type ChangeStatus = { type: 'filter/changeStatus', payload: Status };
type Action = ChangeQuery | ChangeStatus;
type InitialStateType = {
  query: string;
  status: Status;
};

const changeQuery = (query: string): ChangeQuery => ({
  type: 'filter/changeQuery',
  payload: query,
});

const changeStatus = (status: Status): ChangeStatus => ({
  type: 'filter/changeStatus',
  payload: status,
});

const initialState: InitialStateType = {
  query: '',
  status: 'all',
};

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/changeQuery':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/changeStatus':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export const actions = { changeQuery, changeStatus };

export default filterReducer;
