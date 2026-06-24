type SetFilterQuery = {
  type: 'filter/query';
  value: string;
};

export type FilterStatusType = 'all' | 'active' | 'completed';

const setQuery = (value: string): SetFilterQuery => ({
  type: 'filter/query',
  value,
});

type SetFilterStatus = {
  type: 'filter/status';
  value: string;
};

const setStatus = (value: FilterStatusType): SetFilterStatus => ({
  type: 'filter/status',
  value,
});

type Action = SetFilterQuery | SetFilterStatus;

type FilterState = {
  query: string;
  status: string;
};

const initialState: FilterState = {
  query: '',
  status: 'all',
};

const reducer = (
  state: FilterState | undefined,
  action: Action,
): FilterState => {
  switch (action.type) {
    case 'filter/query':
      return {
        ...(state ?? initialState),
        query: action.value,
      };
    case 'filter/status':
      return {
        ...(state ?? initialState),
        status: action.value,
      };
    default:
      return state ?? initialState;
  }
};

export const actions = {
  setQuery,
  setStatus,
};

export default reducer;
