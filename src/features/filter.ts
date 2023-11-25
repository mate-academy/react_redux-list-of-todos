import { StatusFilterSelect } from '../enums/StatusFilterSelect';
import { Status } from '../types/Status';

type ActionFilterBySelect = { type: 'filter/SELECT', payload: Status };
type ActionFilterByQuery = { type: 'filter/QUERY', payload: string };

const filterBySelect = (selectAction: Status): ActionFilterBySelect => {
  return {
    type: 'filter/SELECT',
    payload: selectAction,
  };
};

const filterByQuery = (query: string): ActionFilterByQuery => {
  return {
    type: 'filter/QUERY',
    payload: query,
  };
};

type Actions = ActionFilterBySelect | ActionFilterByQuery;

type Filter = {
  query: string,
  status: Status,
};

const startBeforeFilter: Filter = { query: '', status: StatusFilterSelect.ALL };

const filterReducer = (state = startBeforeFilter, actions: Actions): Filter => {
  switch (actions.type) {
    case 'filter/SELECT': {
      return {
        ...state,
        status: actions.payload,
      };
    }

    case 'filter/QUERY': {
      return {
        ...state,
        query: actions.payload,
      };
    }

    default:
      return state;
  }
};

export const actions = { filterBySelect, filterByQuery };

export default filterReducer;
