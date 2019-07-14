import {
  LOAD,
  DISPLAY,
  REMOVE,
  SORTING,
} from './actions';

const initialState = {
  requested: false,
  todos: null,
};

export default function getNextState(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        requested: true,
      };
    case DISPLAY:
      return {
        ...state,
        todos: action.value,
      };
    case REMOVE:
      return {
        ...state,
        todos: action.data,
      };
    case SORTING:
      return {
        ...state,
        todos: action.data,
      };
    default:
      return state;
  }
}
