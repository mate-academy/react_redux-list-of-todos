import { Status } from '../types/Status';

type FilterByStatusAction = {
  type: 'filter/BY_STATUS';
  payload: Status;
};

type FilterByQueryAction = {
  type: 'filter/BY_QUERY';
  payload: string;
};

const filterByStatus = (status: Status): FilterByStatusAction => ({
  type: 'filter/BY_STATUS',
  payload: status,
});

const filterByQuery = (query: string): FilterByQueryAction => ({
  type: 'filter/BY_QUERY',
  payload: query,
});

export const actions = { filterByStatus, filterByQuery };

type State = {
  query: string,
  status: Status,
};

type Action = FilterByStatusAction | FilterByQueryAction;

const initialState = {
  query: '',
  status: Status.all,
};

const filterReducer = (
  state: State = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'filter/BY_STATUS':
      return {
        ...state,
        status: action.payload,
      };

    case 'filter/BY_QUERY':
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
