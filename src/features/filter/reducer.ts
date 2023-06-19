import { TodoStatusTypes } from '../../types/enums/TodoStatusTypes';
import {
  FilterActions,
  State,
  Action,
} from './types';

const initialState: State = {
  query: '',
  status: TodoStatusTypes.ALL,
};

const filterReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case FilterActions.SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };

    case FilterActions.SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };

    case FilterActions.CLEAR_QUERY:
      return {
        ...state,
        query: '',
      };

    default:
      return state;
  }
};

export default filterReducer;
