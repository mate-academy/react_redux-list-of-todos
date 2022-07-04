import { createStore } from 'redux';
import { GET_USER, SET_TODOS } from './actions';

const initialState: RootState = {
  loading: false,
  message: '',
  todos: [],
  user: {},
};

const reducer = (
  state = initialState, action: Action,
) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: [...action.payload],
      };

    case GET_USER:
      return {
        ...state,
        user: { ...action.payload },
      };

    default:
      return state;
  }
};

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';

// Action creators - a function returning an action object
export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = (message = 'No message') => ({
  type: FINISH_LOADING,
  message,
});

// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(reducer);

export default store;
