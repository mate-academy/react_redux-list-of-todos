import { Filter } from '../types/Filter';
import { Status } from '../types/Status';

type AddStatusAction = { type: 'filter/ADD_STATUS', payload: Status };
type AddQueryAction = { type: 'filter/ADD_QUERY', payload: string };
type ClearQueryAction = { type: 'filter/CLEAR_QUERY' };

type Action = AddStatusAction | AddQueryAction | ClearQueryAction;

const AddStatus = (payload: Status): AddStatusAction => (
  { type: 'filter/ADD_STATUS', payload });
const AddQuery = (payload: string): AddQueryAction => (
  { type: 'filter/ADD_QUERY', payload });
const ClearQuery = (): ClearQueryAction => ({ type: 'filter/CLEAR_QUERY' });

const initialFilter: Filter = {
  query: '',
  status: 'all',
};

const filterReducer = (filter: Filter = initialFilter, action: Action) => {
  switch (action.type) {
    case 'filter/ADD_STATUS':
      return { ...filter, status: action.payload };

    case 'filter/ADD_QUERY':
      return { ...filter, query: action.payload };

    case 'filter/CLEAR_QUERY':
      return { ...filter, query: '' };

    default:
      return filter;
  }
};

export const actions = { AddStatus, AddQuery, ClearQuery };
export default filterReducer;
