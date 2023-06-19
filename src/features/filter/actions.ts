import { TodoStatusTypes } from '../../types/enums/TodoStatusTypes';
import {
  ValueOf,
  StatusActionType,
  FilterActions,
  SetQueryActionType,
  ClearQueryActionType,
} from './types';

const setStatus = (status: ValueOf<TodoStatusTypes>): StatusActionType => ({
  type: FilterActions.SET_STATUS,
  payload: status,
});
const setQuery = (query: string): SetQueryActionType => ({
  type: FilterActions.SET_QUERY,
  payload: query,
});
const clearQuery = (): ClearQueryActionType => ({
  type: FilterActions.CLEAR_QUERY,
  payload: '',
});

export const actions = {
  setStatus,
  setQuery,
  clearQuery,
};
