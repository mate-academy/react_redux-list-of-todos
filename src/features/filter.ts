import { Status } from '../types/Status';

const defaultValue = {
  query: '',
  status: 'all' as Status,
};

type ChangeQuery = { type: 'filter/CHANGE_QUERY', payload: string };
type ChangeStatus = { type: 'filter/CHANGE_STATUS', payload: Status };

export const actions = {
  changeQuery: (query: string): ChangeQuery => ({
    type: 'filter/CHANGE_QUERY',
    payload: query,
  }),
  changeStatus: (newStatus: Status): ChangeStatus => ({
    type: 'filter/CHANGE_STATUS',
    payload: newStatus,
  }),
};

type Action = ChangeQuery | ChangeStatus;

type Filter = {
  query: string,
  status: Status,
};

const filterReducer = (
  state: Filter = defaultValue,
  action: Action,
): Filter => {
  switch (action.type) {
    case 'filter/CHANGE_QUERY':
      return {
        ...state,
        query: action.payload,
      };
    case 'filter/CHANGE_STATUS':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
