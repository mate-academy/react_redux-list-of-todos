import { createStore, AnyAction, applyMiddleware, Dispatch } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { request } from "../api/api";
import thunk from "redux-thunk";

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = "START_LOADING";
const FINISH_LOADING = "FINISH_LOADING";
const GET_TODOS = "GET_TODOS";

// Action creators - a function returning an action object
export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = (message = "No message") => ({
  type: FINISH_LOADING,
  message,
});
export const getTodos = (todos: any[]) => ({
  type: GET_TODOS,
  todos,
});
export const fetchTodos = () => (dispatch: Dispatch) => {
  request("todos").then((res) => dispatch(getTodos(res.data)));
};

// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;

// Initial state
export type RootState = {
  loading: boolean;
  message: string;
  todos: any[];
};

const initialState: RootState = {
  loading: false,
  message: "",
  todos: [],
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true };

    case FINISH_LOADING:
      return {
        ...state,
        loading: false,
        message: action.message,
      };

    case GET_TODOS:
      console.log("todos");
      return {
        ...state,
        todos: action.todos,
      };

    default:
      return state;
  }
};

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) // allows you to use http://extension.remotedev.io/
);

export default store;
