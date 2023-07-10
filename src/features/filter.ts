type SelectFilterAction = { type: 'filter/SELECT', payload: string };
type SearchFilterAction = { type: 'filter/SEARCH', payload: string };
type SearchingFilterClearAction = { type: 'filter/CLEAR' };

const filterSelect = (status: string): SelectFilterAction => ({
  type: 'filter/SELECT', payload: status,
});
const searchingFilter = (query: string): SearchFilterAction => ({
  type: 'filter/SEARCH', payload: query,
});
const searchingFilterClear = (): SearchingFilterClearAction => ({
  type: 'filter/CLEAR',
});

type State = { query: string, status: string };
type Action =
  SearchFilterAction |
  SelectFilterAction |
  SearchingFilterClearAction;

const filterReducer = (state: State = {
  query: '', status: 'All',
}, action: Action): State => {
  switch (action.type) {
    case 'filter/SELECT':
      return {
        ...state,
        status: action.payload,
      };
    case 'filter/SEARCH':
      return {
        ...state,
        query: action.payload,
      };
    case 'filter/CLEAR':
      return {
        ...state,
        query: '',
      };
    default:
      return state;
  }
};

export const actions = { filterSelect, searchingFilter, searchingFilterClear };

export default filterReducer;
