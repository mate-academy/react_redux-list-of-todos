type FilterState = {
  query : string
  completed: string
};

const initialState: FilterState = {
  query: '',
  completed: 'filter-all',
};

type SetQuaryFilterAction = {
  type: 'set-query'
  payload: string,
};

type SetCompletedFilterAction = {
  type: string
  payload: string
};

type FilterActions = SetCompletedFilterAction | SetQuaryFilterAction;

export const actions = {
  SetCompletedFilter: (
    type: string,
  ): SetCompletedFilterAction => ({ payload: '', type }),
  setQueryFilter: (query: string): SetQuaryFilterAction => (
    { payload: query, type: 'set-query' }
  ),
};

export const filterReducer = (
  state: FilterState = initialState,
  action: FilterActions,
) => {
  switch (action.type) {
    case 'filter-all':
      return {
        ...state,
        completed: 'filter-all',
      };

    case 'filter-completed':
      return {
        ...state,
        completed: 'filter-completed',
      };

    case 'filter-active':
      return {
        ...state,
        completed: 'filter-active',
      };
    case 'set-query':
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};
