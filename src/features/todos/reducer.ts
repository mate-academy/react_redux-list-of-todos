import {
  TodosActions, State,
  Action,
} from './types';

const initialState: State = {
  todos: [],
  isLoaded: false,
  isError: false,
};
const todosReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case TodosActions.ADD:
      return {
        ...state,
        todos: action.payload,
      };

    case TodosActions.LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };

    case TodosActions.ERROR:
      return {
        ...state,
        isError: action.payload,
      };

    default:
      return state;
  }
};

export default todosReducer;
