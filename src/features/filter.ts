/* eslint-disable max-len */
import { Filter } from '../types/Status';

const SET_FILTER = 'filter/SET_FILTER';
const SET_SEARCH_TEXT = 'filter/SET_SEARCH_TEXT';

// interface SetFilterAction {
//   type: typeof SET_FILTER;
//   payload: Filter;
// }

// interface SetSearchTextAction {
//   type: typeof SET_SEARCH_TEXT;
//   payload: string;
// }

export const actions = {
  setSearchText: (text: string) => ({ type: SET_SEARCH_TEXT, payload: text }),
  setFilter: (filter: Filter) => ({ type: SET_FILTER, payload: filter }),
};

// interface FilterState {
//   query: string;
//   status: Filter;
// }

const initialState = {
  query: '',
  status: Filter.All,
};

const filterReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        status: action.payload,
      };
    case SET_SEARCH_TEXT:
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
