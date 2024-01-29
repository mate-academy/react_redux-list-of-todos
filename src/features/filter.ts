/* eslint-disable max-len */
type ActionType = 'filter/ALL' | 'filter/ACTIVE' | 'filter/COMPLETED' | 'filter/QUERY' | 'filter/QUERYCLEAR';
type FilterState = { query: string, status: 'all' | 'active' | 'completed' };
interface FilterAction {
  type: ActionType;
  payload: FilterState;
}
interface FilterActions {
  query: (arg: string) => FilterAction;
  queryClear: () => FilterAction;
  all: () => FilterAction;
  active: () => FilterAction;
  completed: () => FilterAction;
}

export const filterActions:FilterActions = {
  /* put action creators here */
  query: (arg:string) => ({ type: 'filter/QUERY', payload: { query: arg, status: 'all' } }),
  queryClear: () => ({ type: 'filter/QUERYCLEAR', payload: { query: '', status: 'all' } }),
  all: () => ({ type: 'filter/ALL', payload: { query: '', status: 'all' } }),
  active: () => ({ type: 'filter/ACTIVE', payload: { query: '', status: 'active' } }),
  completed: () => ({ type: 'filter/COMPLETED', payload: { query: '', status: 'completed' } }),
};

const defaultState:FilterState = {
  query: '',
  status: 'all',
};

const filterReducer = (state:FilterState = defaultState, action:FilterAction) => {
  switch (action.type) {
    case 'filter/ALL':
      return { ...action.payload, query: state.query };

    case 'filter/ACTIVE':
      return { ...action.payload, query: state.query };

    case 'filter/COMPLETED':
      return { ...action.payload, query: state.query };

    case 'filter/QUERY':
      return { ...action.payload, status: state.status };

    case 'filter/QUERYCLEAR':
      return { ...action.payload, status: state.status };

    default:
      return state;
  }
};

export default filterReducer;
