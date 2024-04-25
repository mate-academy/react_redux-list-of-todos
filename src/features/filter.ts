export type FilterState = {
  query: string;
  status: string;
};

type SetFilterAction = {
  type: 'filter/SET';
  payload: FilterState;
};

const setFilter = (filter: FilterState): SetFilterAction => ({
  type: 'filter/SET',
  payload: filter,
});

export const actions = { setFilter };

type Action = SetFilterAction;
const defaultFilter = {
  query: '',
  status: 'all',
};

const filterReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: FilterState = defaultFilter,
  action: Action,
): FilterState => {
  switch (action.type) {
    case 'filter/SET':
      return action.payload;
    default:
      return state;
  }
};

export default filterReducer;
