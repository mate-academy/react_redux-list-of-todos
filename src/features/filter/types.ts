import { StatusFilter } from '../../enums/StatusFilter';

export enum FilterActions {
  SET_QUERY = 'filter/SET_QUERY',
  CLEAR_QUERY = 'filter/CLEAR_QUERY',
  SET_FILTER = 'filter/SET_FILTER',
}

export type SetQueryAction = {
  type: FilterActions.SET_QUERY;
  payload: string;
};

export type ClearQueryAction = {
  type: FilterActions.CLEAR_QUERY;
};

export type SetFilterAction = {
  type: FilterActions.SET_FILTER;
  payload: StatusFilter;
};
