import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Action types - is just a constant. MUST have a unique value.
const LOAD_TODOS = 'LOAD_TODOS';

// Action creators - a function returning an action object
// export const startLoading = () => ({ type: START_LOADING });
// export const finishLoading = (message = 'No message') => ({ type: FINISH_LOADING, message });

// Selectors - a function receiving Redux state and returning some data from it
export const getState = (state: RootState) => state.todos;

const initialState: RootState = {
  selectedUserId: 0,
  todos: [],
  filterParameter: '',
  searchTitle: '',
  userError: '',
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOAD_TODOS:
      return {
        ...state,
        todos: action.payload,
      };

      // case FINISH_LOADING:
      //   return {
      //     ...state,
      //     loading: false,
      //     message: action.message,
      //   };

    default:
      return state;
  }
};

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
// const store = createStore(
//   rootReducer,
//   composeWithDevTools(), // allows you to use http://extension.remotedev.io/
// );

const store = createStore(rootReducer, composeWithDevTools());

export default store;
