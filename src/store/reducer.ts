import { Reducer } from 'redux';
import {
  Actions,
  ActionTypes,
  RootState,
} from './types';

const initialState: RootState = {
  todos: [],
  selectedUserId: 0,
  allUsers: [],
  loading: false,
  message: '',
};

// rootReducer - this function is called after dispatching an action
export const rootReducer: Reducer<RootState, Actions> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case ActionTypes.AddTodos:
      return {
        ...state,
        todos: [...state.todos, ...action.payload],
      };

    case ActionTypes.AddAllUsers:
      return {
        ...state,
        users: [...state.allUsers, ...action.payload],
      };

    case ActionTypes.SelectedUserId:
      return {
        ...state,
        selectedUserId: action.payload,
      };
      // case ActionTypes.StartLoading:
      //   return { ...state, loading: true };

      // case ActionTypes.FinishLoading:
      //   return {
      //     ...state,
      //     loading: false,
      //     message: action.message,
      //   };

    default:
      return state;
  }
};
