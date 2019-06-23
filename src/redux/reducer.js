import { LOAD, DISPLAY, REMOVE, SORTING } from './actions';

const initialState = {
  requested: false,
  data: null,
};

function getNextState(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        requested: true,
      };
    case DISPLAY:
      return {
        ...state,
        data: action.data,
      };
    case REMOVE:
      return {
        ...state,
        data: action.data,
      };
    case SORTING:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
}

export default getNextState;
