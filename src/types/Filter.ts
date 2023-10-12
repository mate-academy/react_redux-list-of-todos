import { FilterActionTypes } from '../enums';

export type FilterPayload = {
  query: string,
  status: string
};

export type FilterAction = {
  type: FilterActionTypes,
  payload: string,
};
