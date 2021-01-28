import { AnyAction } from 'redux';
import { NavType } from '../api/interface';

export const ALL_TODOS = 'All_TODOS';
export const COMPLETED_TODOS = 'COMPLETED_TODOS';
export const ACTIVE_TODOS = 'ACTIVE_TODOS';
export const FILTERING = 'FILTERING';

export function allTodosAction() {
  return {
    type: ALL_TODOS,
  };
}

export function completedTodosAction() {
  return {
    type: COMPLETED_TODOS,
  };
}

export function activeTodosAction() {
  return {
    type: ACTIVE_TODOS,
  };
}

export function filteringTodosAction(query: string) {
  return {
    type: FILTERING,
    query,
  };
}

const initialState: NavType = {
  filteringType: ALL_TODOS,
  query: '',
};

export function navReducer(state: NavType = initialState, action: AnyAction) {
  switch (action.type) {
    case ALL_TODOS:
    case ACTIVE_TODOS:
    case COMPLETED_TODOS:
      return {
        ...state,
        filteringType: action.type,
      };
    case FILTERING:
      return {
        ...state,
        query: action.query,
      };
    default:
      return state;
  }
}

export const getFilteringType = (state: NavType): string => state.filteringType;
export const getQueryFiltering = (state: NavType): string => state.query;
