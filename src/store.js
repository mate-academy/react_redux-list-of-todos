import { createStore } from 'redux';

const START_LOADING = 'START_LOADING';
const HANDLE_SUCCESS = 'HUNDLE_SUCCESS';

export const startLoading = () => ({ type: START_LOADING });
export const handleSuccess = todos => ({
  type: HANDLE_SUCCESS,
  todos,
});

const rootReduce = (state, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case HANDLE_SUCCESS:
      return {
        ...state,
        todos: action.todos,
        isLoading: false,
      };
    default:
      return state;
  }
};

const initialState = {
  todos: [],
  isLoading: false,
};

const store = createStore(rootReduce, initialState);

export default store;
