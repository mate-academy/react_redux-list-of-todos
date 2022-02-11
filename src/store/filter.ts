import { AnyAction } from 'redux';
import { Filter, State } from '../react-app-env';
import { TodoStatus } from '../types/TodoStatus';

enum ActionTypes {
  SetQuery = 'filter/setQuery',
  SetStatus = 'filter/setStatus',
}

export const filterActions = {
  setQuery: (query: string): AnyAction => ({
    type: ActionTypes.SetQuery,
    value: query,
  }),

  setStatus: (status: TodoStatus): AnyAction => ({
    type: ActionTypes.SetStatus,
    value: status,
  }),
};

export const filterSelectors = {
  getFilter: (state: State): Filter => state.filter,
};

const initState: Filter = {
  query: '',
  status: TodoStatus.All,
};

export const filterReduser = (state: Filter = initState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.SetQuery:
      return {
        ...state,
        query: action.value,
      };

    case ActionTypes.SetStatus:
      return {
        ...state,
        status: action.value,
      };

    default:
      return state;
  }
};
