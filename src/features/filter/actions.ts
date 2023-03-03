import { StatusFilter } from '../../enums/StatusFilter';
import {
  ClearQueryAction,
  FilterActions,
  SetFilterAction,
  SetQueryAction,
} from './types';

const setQuery = (newQuery: string): SetQueryAction => ({
  type: FilterActions.SET_QUERY,
  payload: newQuery,
});

const clearQuery = (): ClearQueryAction => ({
  type: FilterActions.CLEAR_QUERY,
});

const setFilter = (filter: StatusFilter): SetFilterAction => ({
  type: FilterActions.SET_FILTER,
  payload: filter,
});

export const actions = { setQuery, clearQuery, setFilter };
