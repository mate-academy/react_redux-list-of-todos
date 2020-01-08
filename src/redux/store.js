import { createStore } from 'redux';

const START_LOAD = 'start_loading';
const HANDLE_SUCCESS = 'handle_success';
const HANDLE_DELETE = 'handle_delete';

export const startLoad = () => ({ type: START_LOAD });

export const handleSuccess = todoList => ({
  type: HANDLE_SUCCESS, todoList,
});

export const handleDelete = payload => ({
  type: HANDLE_DELETE, payload,
});

const reducer = (state, action) => {
  switch (action.type) {
    case START_LOAD:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };

    case HANDLE_SUCCESS:
      return {
        ...state,
        todoList: action.todoList,
        isLoading: true,
      };

    case HANDLE_DELETE:
      return {
        ...state,
        todoList: state.todoList.filter(item => item.id !== action.payload),
      };

    default:
      return state;
  }
};

const initialState = {
  isLoading: false,
  hasError: false,
  todoList: [],
};

const store = createStore(reducer, initialState);

export default store;
