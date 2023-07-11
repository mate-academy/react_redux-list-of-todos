export type Status = 'all' | 'active' | 'completed';

export interface FilterState {
  query: string;
  status: Status;
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
