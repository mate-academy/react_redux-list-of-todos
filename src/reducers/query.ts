import {AnyAction} from "redux";
import {SET_QUERY} from "../actions/types";

const queryReducer = (query = '', action: AnyAction): string => {
  switch (action.type) {
    case SET_QUERY:
      return action.query;
    default:
      return query;
  }
};

export default queryReducer;
