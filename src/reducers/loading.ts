import {AnyAction} from "redux";
import {FINISH_LOADING, START_LOADING} from "../actions/types";

const loadingReducer = (loading = false, action: AnyAction): boolean => {
  switch (action.type) {
    case START_LOADING:
      return true;
    case FINISH_LOADING:
      return false;
    default:
      return loading;
  }
};

export default loadingReducer;


