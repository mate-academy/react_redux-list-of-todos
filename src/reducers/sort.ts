import {AnyAction} from "redux";
import {SORT_BY} from "../actions/types";

type SortState = {
  field: string;
  order: string;
}

const initialState: SortState = {
  field: 'id',
  order: 'ASC'
}

const sortReducer = (state = initialState, action: AnyAction): SortState => {
  switch (action.type) {
    case SORT_BY:
      if (action.field === state.field) {
        return {
          ...state,
          order: state.order === 'ASC' ? 'DESC' : 'ASC',
        };
      }

      return {
        ...state,
        field: action.field,
        order: 'ASC',
      };
    default:
      return state;
  }
};


export default sortReducer;
