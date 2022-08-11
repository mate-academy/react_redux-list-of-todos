import { SortedType } from '../SortType';

export type FilterState = {
  query: string,
  completingState: SortedType,
};

export type AllFilterAction = {
  type: 'filter/all'
};

export type ActiveFilterAction = {
  type: 'filter/active'
};

export type CompletedFilterAction = {
  type: 'filter/completed'
};

export type SetQueryFilterAction = {
  type: 'filter/setQuery',
  payload: string,
};

export type ClearQueryFilterAction = {
  type: 'filter/clearQuery',
};

export type FilterAction = (
  AllFilterAction
  | ActiveFilterAction
  | CompletedFilterAction
  | SetQueryFilterAction
  | ClearQueryFilterAction
);
