import { Filter } from '../types/Filter';
import { Status } from '../types/Status';

type ChangeGlobalAction = {
  type: 'filter/CHANGE_GLOBAL',
  payload: Status,
};

type ChangeQueryAction = {
  type: 'filter/CHANGE_QUERY',
  payload: string,
};

type ClearQueryAction = {
  type: 'filter/CLEAR_QUERY',
};

const changeGlobal = (status: Status): ChangeGlobalAction => ({
  type: 'filter/CHANGE_GLOBAL',
  payload: status,
});

const changeQuery = (query: string): ChangeQueryAction => ({
  type: 'filter/CHANGE_QUERY',
  payload: query,
});

const clearQuery = (): ClearQueryAction => ({
  type: 'filter/CLEAR_QUERY',
});

export const actions = { changeGlobal, changeQuery, clearQuery };

type Action = ChangeGlobalAction | ChangeQueryAction | ClearQueryAction;

const initialFilterState: Filter = {
  global: Status.All,
  query: '',
};

const filterReducer = (
  state: Filter = initialFilterState,
  action: Action,
): Filter => {
  switch (action.type) {
    case 'filter/CHANGE_GLOBAL':
      return {
        ...state,
        global: action.payload,
      };

    case 'filter/CHANGE_QUERY':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/CLEAR_QUERY':
      return {
        ...state,
        query: '',
      };

    default:
      return state;
  }
};

export default filterReducer;
