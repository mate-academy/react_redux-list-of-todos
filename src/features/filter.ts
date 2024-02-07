type AllAction = { type: 'filter/ALL'; };
type ActiveAction = { type: 'filter/ACTIVE'; };
type CompletedAction = { type: 'filter/COMPLETED'; };
type ByQueryAction = {
  type: 'filter/QUERY',
  payload: string
};

type Action = AllAction
| ActiveAction
| CompletedAction
| ByQueryAction;

const filterAll = (): AllAction => ({ type: 'filter/ALL' });
const filterActive = (): ActiveAction => ({ type: 'filter/ACTIVE' });
const filterCompleted = (): CompletedAction => ({ type: 'filter/COMPLETED' });
const filterByQuery = (query: string): ByQueryAction => ({
  type: 'filter/QUERY',
  payload: query,
});

export const actions = {
  filterAll,
  filterActive,
  filterCompleted,
  filterByQuery,
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

    case 'filter/QUERY':
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
