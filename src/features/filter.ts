import { Status } from '../types/Status';

type SetStatusAllAction = {
  type: 'filter/status/SET:ALL',
};

type SetStatusActiveAction = {
  type: 'filter/status/SET:ACTIVE',
};

type SetSatusComplitedAction = {
  type: 'filter/status/SET:COMPLITED',
};

export type SetQueryAction = {
  type: 'filter/query/SET',
  payload: string,
};

type RemoveQueryAction = { type: 'filter/query/REMOVE' };

const setStatusAll = (): SetStatusAllAction => ({
  type: 'filter/status/SET:ALL',
});

const setStatusActive = (): SetStatusActiveAction => ({
  type: 'filter/status/SET:ACTIVE',
});

const setStatusComplited = (): SetSatusComplitedAction => ({
  type: 'filter/status/SET:COMPLITED',
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/query/SET',
  payload: query,
});

const removeQuery = (): RemoveQueryAction => ({ type: 'filter/query/REMOVE' });

export const actions = {
  setStatusAll,
  setStatusActive,
  setStatusComplited,
  setQuery,
  removeQuery,
};

export type State = {
  status: Status,
  query: string,
};

export type Action = (
  SetStatusAllAction
  | SetStatusActiveAction
  | SetSatusComplitedAction
  | SetQueryAction
  | RemoveQueryAction
);

const initialState = {
  status: Status.all,
  query: '',
};

const filterReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'filter/status/SET:ALL':
      return {
        ...state,
        status: Status.all,
      };

    case 'filter/status/SET:ACTIVE':
      return {
        ...state,
        status: Status.active,
      };

    case 'filter/status/SET:COMPLITED':
      return {
        ...state,
        status: Status.complited,
      };

    case 'filter/query/SET':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/query/REMOVE':
      return {
        ...state,
        query: '',
      };

    default:
      return state;
  }
};

export default filterReducer;
