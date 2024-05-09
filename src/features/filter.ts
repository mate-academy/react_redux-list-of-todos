type SetQueryAction = {
  type: 'filter/QUERYSET';
  payload: string;
};

type SetStatusAction = {
  type: 'filter/STATUSSET';
  payload: string;
};

type Action = SetQueryAction | SetStatusAction;

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/QUERYSET',
  payload: query,
});

const setStatus = (status: string): SetStatusAction => ({
  type: 'filter/STATUSSET',
  payload: status,
});

export const actions = {
  setQuery,
  setStatus,
};

type FilterData = {
  query: string;
  status: string;
};

const filterData: FilterData = {
  query: '',
  status: 'all',
};

type State = FilterData;

const filterReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: State = filterData,
  action: Action,
): FilterData => {
  switch (action.type) {
    case 'filter/QUERYSET':
      return { ...state, query: action.payload };

    case 'filter/STATUSSET':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
