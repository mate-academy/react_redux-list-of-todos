export type Filter = 'all' | 'completed' | 'active';
type State = {
  query: string;
  filter: Filter;
};

type SetFilterAction = {
  type: 'filter/SET_FILTER';
  payload: Filter;
};

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

type Action = SetFilterAction | SetQueryAction;

const setFilter = (filter: Filter): SetFilterAction => ({
  type: 'filter/SET_FILTER',
  payload: filter,
});

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

export const actions = {
  setFilter,
  setQuery,
};

const initialState: State = {
  query: '',
  filter: 'all',
};

export const filterReducer = (
  state: State = initialState,
  { type, payload }: Action,
): State => {
  switch (type) {
    case 'filter/SET_FILTER':
      return {
        ...state,
        filter: payload as Filter,
      };

    case 'filter/SET_QUERY':
      return {
        ...state,
        query: payload,
      };

    default:
      return state;
  }
};
