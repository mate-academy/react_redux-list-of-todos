import { Status } from '../types/Status';

export interface State {
  query: string,
  status: Status,
}

const initialState: State = {
  query: '',
  status: 'all',
};

export type SetQueryAction = {
  type: 'filter/set-query',
  payload: string,
};

export type SetStatusAction = {
  type: 'filter/set-status',
  payload: Status,
};

export type Actions = SetQueryAction | SetStatusAction;

const filterReducer = (
  state: State = initialState,
  action: Actions,
): State => {
  switch (action.type) {
    case 'filter/set-query':
      return {
        ...state,
        query: action.payload,
      };
    case 'filter/set-status':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;

export const setQueryActionCreator = (query: string):SetQueryAction => ({
  type: 'filter/set-query',
  payload: query,
});

export const setStatusActionCreator = (status: Status):SetStatusAction => ({
  type: 'filter/set-status',
  payload: status,
});
