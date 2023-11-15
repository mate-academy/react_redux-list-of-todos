import { Status } from '../types/Status';

type SetStatus = {
  type: 'filter/SET_STATUS';
  payload: Status;
};

const setStatus = (newStatus: Status): SetStatus => ({
  type: 'filter/SET_STATUS',
  payload: newStatus,
});

type RemoveStatus = {
  type: 'filter/REMOVE_STATUS';
};

const removeStatus = (): RemoveStatus => ({
  type: 'filter/REMOVE_STATUS',
});

type ChangeQuery = {
  type: 'filter/CHANGE_QUERY';
  payload: string;
};

const changeQuery = (newString: string): ChangeQuery => ({
  type: 'filter/CHANGE_QUERY',
  payload: newString,
});

type ClearQuery = {
  type: 'filter/CLEAR_QUERY';
};

const clearQuery = (): ClearQuery => ({
  type: 'filter/CLEAR_QUERY',
});

export const actions = {
  setStatus,
  removeStatus,
  changeQuery,
  clearQuery,
};

type State = { query: string, status: Status };
type Action = SetStatus | RemoveStatus | ChangeQuery | ClearQuery;

const defaultState: State = {
  query: '',
  status: Status.All,
};

const filterReducer = (
  state: State = defaultState,
  action: Action,
) => {
  switch (action.type) {
    case 'filter/SET_STATUS':
      return {
        ...state,
        status: action.payload,
      };
    case 'filter/REMOVE_STATUS':
      return {
        ...state,
        status: Status.All,
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
      return defaultState;
  }
};

export default filterReducer;
