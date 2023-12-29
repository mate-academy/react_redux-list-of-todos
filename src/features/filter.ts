/* eslint-disable @typescript-eslint/comma-dangle */
type Filter = {
  query: string;
  status: string;
};

type SetFiltersAction = {
  type: 'filter/SET';
  payload: Filter;
};

const setFilters = (filters: Filter): SetFiltersAction => ({
  type: 'filter/SET',
  payload: filters,
});

export const actions = { setFilters };

type Action = SetFiltersAction;

const filterReducer = (
  state: Filter = {
    query: '',
    status: 'all',
  },
  action: Action
): Filter => {
  switch (action.type) {
    case 'filter/SET':
      return action.payload;
    default:
      return state;
  }
};

export default filterReducer;
