import type { Status } from '../types/Status';

type SetQueryAction = {
  type: 'filter/SET';
  payload: string;
};

type ClearQueryAction = {
  type: 'filter/CLEAR';
};

type ChangeStatusAction = {
  type: 'status/SET';
  payload: Status;
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET',
  payload: query,
});

const clearQuery = (): ClearQueryAction => ({
  type: 'filter/CLEAR',
});

const changeStatus = (status: Status): ChangeStatusAction => ({
  type: 'status/SET',
  payload: status,
});

type State = {
  query: string;
  status: Status;
};

type Action = SetQueryAction | ClearQueryAction | ChangeStatusAction;

export const actions = { setQuery, clearQuery, changeStatus };

const initialState: State = {
  query: '',
  status: 'all',
};

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/SET':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/CLEAR':
      return {
        ...state,
        query: '',
      };

    case 'status/SET':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
