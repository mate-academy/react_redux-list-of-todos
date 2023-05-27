import { ActionTypes } from '../types/Actions';
import { Status } from '../types/Status';

type StateType = {
  searchedTitle: string;
  selectedStatus: Status;
};

type SetTodosQueryAction = {
  type: ActionTypes.changeTodosQuery;
  payload: string;
};

type SetTodosStatusAction = {
  type: ActionTypes.changeTodosStatus;
  payload: Status;
};

type ActionsType = SetTodosQueryAction | SetTodosStatusAction;

const initialState: StateType = {
  searchedTitle: '',
  selectedStatus: Status.all,
};

const setTodosQuery = (searchedTitle: string) => ({
  type: ActionTypes.changeTodosQuery,
  payload: searchedTitle,
});

const setTodosStatus = (selectedStatus: Status) => ({
  type: ActionTypes.changeTodosStatus,
  payload: selectedStatus,
});

export const actions = { setTodosQuery, setTodosStatus };

const filterReducer = (
  state: StateType = initialState,
  action: ActionsType,
): StateType => {
  switch (action.type) {
    case ActionTypes.changeTodosQuery:
      return {
        ...state,
        searchedTitle: action.payload,
      };
    case ActionTypes.changeTodosStatus:
      return {
        ...state,
        selectedStatus: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
