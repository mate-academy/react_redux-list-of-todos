import { Status } from '../types/Status';

type AllStatusAction = { type: Status.ALL };
type ActiveStatusAction = { type: Status.ACTIVE };
type CompletedStatusAction = { type: Status.COMPLETED };
type QueryTodoAction = { type: Status.QUERY, payload: string };

const allTodos = (): AllStatusAction => ({ type: Status.ALL });
const activeTodos = (): ActiveStatusAction => ({
  type: Status.ACTIVE,
});
const completedTodos = (): CompletedStatusAction => ({
  type: Status.COMPLETED,
});
const queryFilter = (value: string): QueryTodoAction => ({
  type: Status.QUERY,
  payload: value,
});

export const actions = {
  allTodos,
  activeTodos,
  completedTodos,
  queryFilter,
};

type State = {
  query: string,
  status: Status
};

type Action = AllStatusAction
| ActiveStatusAction
| CompletedStatusAction
| QueryTodoAction;

const defaultState = {
  query: '',
  status: Status.ALL,
};

const filterReducer = (state: State = defaultState, action: Action): State => {
  switch (action.type) {
    case Status.ACTIVE:
      return {
        ...state,
        status: Status.ACTIVE,
      };

    case Status.ALL:
      return {
        ...state,
        status: Status.ALL,
      };

    case Status.COMPLETED:
      return {
        ...state,
        status: Status.COMPLETED,
      };

    case Status.QUERY:
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
