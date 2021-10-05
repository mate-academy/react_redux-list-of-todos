import { createStore, AnyAction, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { getTodos, getUser } from '../api/api';

const ADD_TODOS = 'ADD_TODOS';
const SET_FILTER_QUERY = 'SET_FILTER_QUERY';
const TYPE_TODOS = 'TYPE_TODOS';
const SELECTED_USER_ID = 'SELECTED_USER_ID';
const ACTIVE_TODO_ID = 'ACTIVE_TODO_ID';
const COMPLETED_TODO = 'COMPLETED_TODO';
const DELETE_TODO = 'DELETE_TODO';
const SHOW_DETAILS_USER = 'SHOW_DETAILS_USER';
const CHANGE_THE_ORDER_OF_TODOS = 'CHANGE_THE_ORDER_OF_TODOS';
const FILTER_TODOS = 'FILTER_TODOS';

export const setTodos = () => (dispatch: any) => {
  getTodos()
    .then(todos => {
      dispatch({
        type: ADD_TODOS,
        payload: todos,
      });
    });
};

export const setFilterQuery = (value: string) => ({
  type: SET_FILTER_QUERY,
  payload: value,
});

export const setTypeTodos = (type: string) => ({
  type: TYPE_TODOS,
  payload: type,
});

export const setUserId = (value: number) => ({
  type: SELECTED_USER_ID,
  payload: value,
});

export const setActiveTodoId = (value: number) => ({
  type: ACTIVE_TODO_ID,
  payload: value,
});

export const setCompletedTodo = (value: boolean, id: number) => ({
  type: COMPLETED_TODO,
  payload: {
    value,
    id,
  },
});

export const deleteTodo = (id: number) => ({
  type: DELETE_TODO,
  payload: id,
});

export const setUserDetails = (userId: number) => (dispatch: any) => {
  getUser(userId)
    .then(user => {
      dispatch({
        type: SHOW_DETAILS_USER,
        payload: user,
      });
    });
};

export const changeTheOrderOfTodos = () => ({ type: CHANGE_THE_ORDER_OF_TODOS });

export const filterTodos = (filter: Filter) => ({
  type: FILTER_TODOS,
  payload: filter,
});

const initialState: RootState = {
  startTodos: [],
  visualizedTodos: [],
  selectedUserId: 0,
  activeTodoId: 0,
  filterQuery: '',
  typeOfTodos: 'all',
  user: null,
};

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_TODOS:
      return {
        ...state,
        startTodos: action.payload,
        visualizedTodos: action.payload,
      };

    case SET_FILTER_QUERY:
      return {
        ...state,
        filterQuery: action.payload,
      };

    case TYPE_TODOS:
      return {
        ...state,
        typeOfTodos: action.payload,
      };

    case SELECTED_USER_ID:
      return {
        ...state,
        selectedUserId: action.payload,
      };

    case ACTIVE_TODO_ID:
      return {
        ...state,
        activeTodoId: action.payload,
      };

    case COMPLETED_TODO: {
      const isCompleted = state.typeOfTodos === 'completed';

      const completedTodos = state.visualizedTodos.map(todo => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            completed: action.payload.value,
          };
        }

        return todo;
      });

      if (state.typeOfTodos === 'all') {
        return {
          ...state,
          visualizedTodos: completedTodos,
        };
      }

      return {
        ...state,
        visualizedTodos: completedTodos
          .filter(({ completed }) => completed === isCompleted),
      };
    }

    case DELETE_TODO:
      return {
        ...state,
        startTodos: state.startTodos.filter(({ id }) => id !== action.payload),
        visualizedTodos: state.visualizedTodos.filter(({ id }) => id !== action.payload),
      };

    case SHOW_DETAILS_USER:
      return {
        ...state,
        user: action.payload,
      };

    case CHANGE_THE_ORDER_OF_TODOS:
      return {
        ...state,
        visualizedTodos: [...state.visualizedTodos]
          .sort(() => Math.random() - 0.5),
      };

    case FILTER_TODOS: {
      const filteredTodos = state.startTodos
        .filter(({ title }) => title.toLowerCase()
          .includes(action.payload.filterQuery.toLowerCase()));

      const isCompleted = action.payload.typeOfTodos === 'completed';

      if (action.payload.typeOfTodos === 'all') {
        return {
          ...state,
          visualizedTodos: filteredTodos,
        };
      }

      return {
        ...state,
        visualizedTodos: filteredTodos
          .filter(({ completed }) => completed === isCompleted),
      };
    }

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
