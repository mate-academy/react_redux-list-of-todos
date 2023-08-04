import { Status } from '../types/Status';

type SetStatusFilterAction = {
  type: 'filter/SET_STATUS_FILTER',
  payload: Status;
};
type SetQueryFilterAction = {
  type: 'filter/SET_QUERY_FILTER',
  payload: string;
};
type ClearQueryFilterAction = {
  type: 'filter/CLEAR_QUERY_FILTER',
};
// type RemoveStatusFilterAction = {
//   type: 'filter/REMOVE_STATUS_FILTER',
// };

const setStatusFilter = (status: Status): SetStatusFilterAction => ({
  type: 'filter/SET_STATUS_FILTER',
  payload: status,
});
const setQueryFilter = (query: string): SetQueryFilterAction => ({
  type: 'filter/SET_QUERY_FILTER',
  payload: query,
});
const clearQueryFilter = (): ClearQueryFilterAction => ({
  type: 'filter/CLEAR_QUERY_FILTER',
});
// const removeStatusFilter = (): RemoveStatusFilterAction => ({
//   type: 'filter/REMOVE_STATUS_FILTER',
// });

export const actions = { setStatusFilter, setQueryFilter, clearQueryFilter };

type Action = SetStatusFilterAction
| SetQueryFilterAction
| ClearQueryFilterAction;

type Filter = {
  query: string;
  status: Status;
};

const initialFilter: Filter = {
  query: '',
  status: 'all',
};

const filterReducer = (
  filter: Filter = initialFilter,
  action: Action,
): Filter => {
  switch (action.type) {
    case 'filter/SET_STATUS_FILTER':
      return {
        ...filter,
        status: action.payload,
      };

    case 'filter/SET_QUERY_FILTER':
      return {
        ...filter,
        query: action.payload,
      };

    case 'filter/CLEAR_QUERY_FILTER':
      return {
        ...filter,
        query: '',
      };

    default:
      return filter;
  }
};

export default filterReducer;
