import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getTodos } from '../API/api.js';
import { TodoInterface } from '../typeObject';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const SELECTED_ALL_TODO = 'SELECTED_ALL_TODO';
const SELECTED_ACTIVE_TODO = 'SELECTED_ACTIVE_TODO';
const SELECTED_COMPLETED_TODO = 'SELECTED_COMPLETED_TODO';
const FIND_VALUE_IN_TITLE = 'FIND_VALUE_IN_TITLE';
const UPDATE_USER_ID = 'UPDATE_USER_ID';
const UPDATE_TODOS = 'UPDATE_TODOS';

// Action creators - a function returning an action object
export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = (message = 'No message') => ({ type: FINISH_LOADING, message });
export const selectedAllTodo = () => ({ type: SELECTED_ALL_TODO });
export const selectedActiveTodo = () => ({ type: SELECTED_ACTIVE_TODO });
export const selectedCompletedTodo = () => ({ type: SELECTED_COMPLETED_TODO });
export const updateTodos = (newArr: TodoInterface) => ({ type: UPDATE_TODOS, currentTodos: newArr });
export const findValueInTitle = (state: RootState) => ({ type: FIND_VALUE_IN_TITLE, currentTodos: state.currentTodos });
export const updateUserIdActions = (id: number) => ({ type: UPDATE_USER_ID, selectedUserId: id });

// Selectors - a function receiving Redux state and returning some data from it
export const isLoading = (state: RootState) => state.loading;
export const getMessage = (state: RootState) => state.message;
export const currentTodos = (state: RootState) => state.currentTodos;
export const selectedUserId = (state: RootState) => state.selectedUserId;

// Initial state
export type RootState = {
  loading: boolean;
  message: string;
  allTodosFromServer: TodoInterface[],
  currentTodos: TodoInterface[],
  selectedUserId: number,
};

const initialState: RootState = {
  loading: false,
  message: '',
  allTodosFromServer: [],
  currentTodos: [],
  selectedUserId: 0,
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true, allTodosFromServer: action.result, currentTodos: action.result, selectedUserId: 0 };

    case SELECTED_ALL_TODO:
      return {
        ...state,
        currentTodos: state.allTodosFromServer,
      };

    case SELECTED_ACTIVE_TODO:
      return {
        ...state,
        currentTodos: state.allTodosFromServer.filter((todo: any) => todo.completed),
      };

    case SELECTED_COMPLETED_TODO:
      return {
        ...state,
        currentTodos: state.allTodosFromServer.filter((todo: any) => !todo.completed),
      };

      case UPDATE_TODOS:
        return {
          ...state,
          currentTodos: action.currentTodos,
        };

    case FIND_VALUE_IN_TITLE:
      return {
        ...state,
        currentTodos: state.allTodosFromServer.filter(todo => (
          !todo.title && typeof todo.title === 'object' ? ''
            : todo.title.toLowerCase()
              .includes(action.inputValue.toLocaleLowerCase())))
      };

    case UPDATE_USER_ID:
      return {
        ...state,
        selectedUserId: action.selectedUserId,
      };

    case FINISH_LOADING:
      return {
        ...state,
        loading: false,
        message: action.message,
      };

    default:
      return state;
  }
};

export const todosFromServer = () => {
  getTodos()
    .then(result => {
      store.dispatch({ type: 'START_LOADING', result });
    })
}

export const filteredTodo = (newArr: TodoInterface) => {
  store.dispatch(updateTodos(newArr));
}

export const updateTodo = (status: string) => {
  if (status === 'All') {
    store.dispatch(selectedAllTodo());
  }

  if (status === 'active') {
    store.dispatch(selectedActiveTodo());
  }

  if (status === 'completed') {
    store.dispatch(selectedCompletedTodo());
  }
}

export const updateUserId = (id: number) => {
  store.dispatch(updateUserIdActions(id))
}

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  composeWithDevTools(), // allows you to use http://extension.remotedev.io/
);

export default store;
