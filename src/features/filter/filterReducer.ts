import { Reducer } from 'redux';

import { StatusFilter } from '../../enums/StatusFilter';
import {
  ClearQueryAction,
  FilterActions,
  SetFilterAction,
  SetQueryAction,
} from './types';

type FilterState = {
  query: string;
  status: StatusFilter;
};

type FilterAction = SetQueryAction | ClearQueryAction | SetFilterAction;

const initialState: FilterState = {
  query: '',
  status: StatusFilter.ALL,
};

export const filterReducer: Reducer<FilterState, FilterAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case FilterActions.SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };

    case FilterActions.CLEAR_QUERY:
      return {
        ...state,
        query: '',
      };

    case FilterActions.SET_FILTER:
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};
