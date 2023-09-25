export enum Status {
  ALL = 'all',
  COMPLETED = 'completed',
  ACTIVE = 'active',
}

export enum FilterTodosTypes {
  SET_STATUS = 'filter/SET_STATUS',
  SET_QUERY = 'filter/SET_QUERY',
}

export type SetStatus = {
  type: FilterTodosTypes.SET_STATUS,
  payload: Status,
};

export type SetQuery = {
  type: FilterTodosTypes.SET_QUERY,
  payload: string
};

export type FilterState = {
  query: string,
  status: Status,
};

export type Action = SetStatus | SetQuery;
