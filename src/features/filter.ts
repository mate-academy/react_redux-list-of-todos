import { Status } from '../types/Status';

enum FilterActions {
  StatusAction = 'filter/CHANGE_STATUS',
  QueryAction = 'filter/CHANGE_QUERY',
  ClearAction = 'filter/CLEAR_QUERY',
}

type StatusAction = { type: FilterActions.StatusAction, payload: Status };
type QueryAction = { type: FilterActions.QueryAction, payload: string };
type ClearAction = { type: FilterActions.ClearAction };

type Actions = StatusAction | QueryAction | ClearAction;

const changeStatus = (payload: Status): StatusAction => ({
  type: FilterActions.StatusAction, payload,
});

const changeQuery = (payload: string): QueryAction => ({
  type: FilterActions.QueryAction, payload,
});

const clear = (): ClearAction => ({ type: FilterActions.ClearAction });

const initialState = {
  status: Status.All,
  query: '',
};

const filterReducer = (state = initialState, actions: Actions) => {
  switch (actions.type) {
    case FilterActions.StatusAction:
      return {
        ...state,
        status: actions.payload,
      };
    case FilterActions.QueryAction:
      return {
        ...state,
        query: actions.payload,
      };
    case FilterActions.ClearAction:
      return {
        ...state,
        query: '',
      };
    default:
      return state;
  }
};

export const actions = { clear, changeQuery, changeStatus };
export default filterReducer;
