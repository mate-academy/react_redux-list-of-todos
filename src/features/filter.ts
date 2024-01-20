type FilterAll = { type: 'filter/ALL' };
type FilterCompleted = { type: 'filter/COMPLETED' };
type FilterActive = { type: 'filter/ACTIVE' };
type Query = { type: 'filter/QUERY', payload: string };
type Action = FilterAll
| FilterCompleted
| FilterActive
| Query;

const filterAll = (): FilterAll => ({ type: 'filter/ALL' });
const filterCompleted = (): FilterCompleted => ({ type: 'filter/COMPLETED' });
const filterActive = (): FilterActive => ({ type: 'filter/ACTIVE' });
const filterQuery = (query: string): Query => ({
  type: 'filter/QUERY',
  payload: query,
});

export const actions = {
  filterAll,
  filterCompleted,
  filterActive,
  filterQuery,
};

const filterReducer = (
  state = {
    query: '',
    status: 'all',
  },
  action: Action,
) => {
  switch (action.type) {
    case 'filter/QUERY':
      return { ...state, query: action.payload };

    case 'filter/COMPLETED':
      return { ...state, status: 'completed' };

    case 'filter/ACTIVE':
      return { ...state, status: 'active' };

    case 'filter/ALL':
      return { ...state, status: 'all' };

    default:
      return state;
  }
};

export default filterReducer;
