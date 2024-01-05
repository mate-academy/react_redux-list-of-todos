type FilterAllAction = { type: 'filter/ALL' };
type FilterActiveAction = { type: 'filter/ACTIVE' };
type FilterCompletedAction = { type: 'filter/COMPLETED' };
type FilterSetQueryAction = { type: 'filter/SETQUERY'; payload: string };

type Action =
  | FilterAllAction
  | FilterActiveAction
  | FilterCompletedAction
  | FilterSetQueryAction;

const setFilterAll = (): FilterAllAction => ({ type: 'filter/ALL' });

const setFilterActive = (): FilterActiveAction => ({ type: 'filter/ACTIVE' });

const setFilterCompleted = (): FilterCompletedAction => ({
  type: 'filter/COMPLETED',
});

const setFilterQuery = (query: string): FilterSetQueryAction => ({
  type: 'filter/SETQUERY',
  payload: query,
});

export const actions = {
  setFilterAll,
  setFilterActive,
  setFilterCompleted,
  setFilterQuery,
};

const filterReducer = (
  state = {
    query: '',
    status: 'all',
  },
  action: Action,
) => {
  switch (action.type) {
    case 'filter/ALL':
      return {
        ...state,
        status: 'all',
      };
    case 'filter/ACTIVE':
      return {
        ...state,
        status: 'active',
      };
    case 'filter/COMPLETED':
      return {
        ...state,
        status: 'completed',
      };
    case 'filter/SETQUERY':
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
