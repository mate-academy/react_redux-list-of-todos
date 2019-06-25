import { LOAD_DATA,
  FILL_DATA,
  REMOVE_TODO,
  SORT_TODOS } from "./actions";

const initialState = {
  requested: false,
  data: null,
};

export function getNextState(state = initialState, action) {
  switch (action.type) {
    case LOAD_DATA:
      return {
        ...state,
        requested: true
      }
    case FILL_DATA:
      return {
        ...state,
        data: action.data
      }
    case REMOVE_TODO:
      return {
        ...state,
        data: state.data.filter((post, index) => index !== action.index)
      }
    case SORT_TODOS:
      const clonedData = [...state.data];
      clonedData.sort((a, b) => a[action.field].localeCompare(b[action.field]))
      return {
        ...state,
        data: clonedData
      }
    default:
      return state;
  }
}
