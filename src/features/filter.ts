import { Status } from '../types/Status';

type Filter = {
  query: string,
  status: Status,
};

type SetFilterAction = {
  type: 'filter/SET',
  payload: Filter,
};

type UpdateFilterAction = {
  type: 'filter/UPDATE',
  payload: Partial<Filter>,
};

const setFilter = (filter: Filter): SetFilterAction => ({
  type: 'filter/SET',
  payload: filter,
});

const updateFilter = (partialFilter: Partial<Filter>): UpdateFilterAction => ({
  type: 'filter/UPDATE',
  payload: partialFilter,
});

export const actions = { setFilter, updateFilter };

type State = Filter;
type Action = SetFilterAction | UpdateFilterAction;

const filterReducer = (
  state: State = { query: '', status: 'all' },
  action: Action,
) => {
  switch (action.type) {
    case 'filter/SET':
      return action.payload;
    case 'filter/UPDATE':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
