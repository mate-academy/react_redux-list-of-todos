import { ActionTypes } from '../types/Actions';
import { Status } from '../types/Status';

type StateType = {
  query: string;
  status: Status;
};

type SetTodosQueryAction = {
  type: ActionTypes.ChangeTodosQuery;
  payload: string;
};

type SetTodosStatusAction = {
  type: ActionTypes.ChangeTodosStatus;
  payload: Status;
};

type ActionsType = SetTodosQueryAction | SetTodosStatusAction;

const initialState: StateType = {
  query: '',
  status: Status.All,
};

const setTodosQuery = (searchedTitle: string) => ({
  type: ActionTypes.ChangeTodosQuery,
  payload: searchedTitle,
});

const setTodosStatus = (selectedStatus: Status) => ({
  type: ActionTypes.ChangeTodosStatus,
  payload: selectedStatus,
});

export const actions = { setTodosQuery, setTodosStatus };

const filterReducer = (
  state: StateType = initialState,
  action: ActionsType,
): StateType => {
  switch (action.type) {
    case ActionTypes.ChangeTodosQuery:
      return {
        ...state,
        query: action.payload,
      };
    case ActionTypes.ChangeTodosStatus:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
