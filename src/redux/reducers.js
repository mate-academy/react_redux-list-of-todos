import {
  LOAD_DATA,
  DISPLAY_DATA,
  REMOVE_ITEM,
  SORT_DATA
} from "./actions";

const initialState = {
  requested: false,
  data: null
};

export default function getNextState(state = initialState, action) {
  switch (action.type) {
    case LOAD_DATA:
      return {
        ...state,
        requested: true
      };
    case DISPLAY_DATA:
      return {
        ...state,
        data: action.data
      };
    case REMOVE_ITEM:
      return {
        ...state,
        data: state.data.filter((item, index) => index !== action.id)
      };
    case SORT_DATA:
      const duplicatedData = [...state.data];
      duplicatedData.sort((a, b) => a[action.string].localeCompare(b[action.string]));
      return {
        ...state,
        data: duplicatedData

      };
    default:
      return state;
  }
}
