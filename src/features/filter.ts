/* eslint-disable */
export enum statusType {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

type SetQuery = { type: 'filter/SET_QUERY', payload: string };
type SetStatus = { type: 'filter/SET_STATUS', payload: statusType };
type ClearQuery = { type: 'filter/CLEAR_QUERY' };

type Action = SetQuery | SetStatus | ClearQuery;

const setQuery = (query: string): SetQuery => ({ type: 'filter/SET_QUERY', payload: query })
const setStatus = (status: statusType): SetStatus => ({ type: 'filter/SET_STATUS', payload: status })
const clearQuery = (): ClearQuery => ({ type: 'filter/CLEAR_QUERY' })

export const actions = { setQuery, setStatus, clearQuery };

const defaultFilter = { query: '', status: statusType.ALL };

const filterReducer = (filter = defaultFilter, action: Action) => {
  switch (action.type) {
    case "filter/SET_QUERY":
      return {
        ...filter,
        query: action.payload,
      }
    case "filter/SET_STATUS":
      return {
        ...filter,
        status: action.payload,
      }
    case "filter/CLEAR_QUERY":
      return {
        ...filter,
        query: '',
      }
    default:
      return filter;
  }
};

export default filterReducer;
