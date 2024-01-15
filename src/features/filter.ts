type FindAllAction = { type: 'filter/ALL' };
type FindCompletedAction = { type: 'filter/COMPLETED' };
type FindActiveAction = { type: 'filter/ACTIVE' };
type FindByQueryAction = { type: 'filter/QUERY', payload: string };
type Action =
  FindAllAction
  | FindCompletedAction
  | FindActiveAction
  | FindByQueryAction;

const findAll = (): FindAllAction => ({ type: 'filter/ALL' });
const findCompleted = (): FindCompletedAction => ({ type: 'filter/COMPLETED' });
const findActive = (): FindActiveAction => ({ type: 'filter/ACTIVE' });
const findByQuery = (query: string): FindByQueryAction => ({
  type: 'filter/QUERY',
  payload: query,
});

export const actions = {
  findAll,
  findCompleted,
  findActive,
  findByQuery,
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
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/COMPLETED':
      return {
        ...state,
        status: 'completed',
      };

    case 'filter/ACTIVE':
      return {
        ...state,
        status: 'active',
      };

    case 'filter/ALL':
      return {
        ...state,
        status: 'all',
      };

    default:
      return state;
  }
};

export default filterReducer;
