export type Status = 'all' | 'active' | 'completed';

export interface FilterState {
  query: string;
  status: Status;
}
export enum Statuses {
  Active = 'active',
  Completed = 'completed',
  All = 'all',
}

export enum FilterActions {
  SetQuery = 'filter/SET_QUERY',
  ClearQuery = 'filter/CLEAR_QUERY',
  SetStatus = 'filter/SET_STATUS',
}

export type QueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

export type ClearQueryAction = {
  type: 'filter/CLEAR_QUERY';
};

export type StatusAction = {
  type: 'filter/SET_STATUS';
  payload: Status;
};

export type Actions = QueryAction | ClearQueryAction | StatusAction;
