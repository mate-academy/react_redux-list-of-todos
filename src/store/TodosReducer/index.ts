import { AnyAction } from 'redux';
import { randomize } from '../../functions/randomizeTodos';
import { ToDo } from '../../types/ToDo';
import {
  LOAD_USER,
  LOAD_TODOS,
  LOAD_VISIBLE_TODOS,
  SET_SELECTED_ID,
  SET_TITLE_QUERY,
  SET_COMPLETED_QUERY,
  SET_IS_RANDOMIZED,
  FILTER_TODOS,
  SET_LOADING_ERROR,
  SORT_TODOS,
  SET_IS_TODOS_SORTED,
  RANDOMIZE_TODOS,
} from './actions';

const initialState = {
  todosFromServer: [],
  visibleTodos: [],
  user: null,
  userID: 0,
  titleQuery: '',
  completeQuery: 'all',
  isRandomized: false,
  isLoadingError: false,
  isTodosSorted: false,
};

export const TodosReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case (LOAD_USER):
      return ({
        ...state,
        user: action.user,
      });

    case (LOAD_TODOS):
      return ({
        ...state,
        todosFromServer: [...action.todosFromServer],
        visibleTodos: [...action.todosFromServer],
      });

    case (LOAD_VISIBLE_TODOS):
      return ({
        ...state,
        visibleTodos: [...action.visibleTodos],
      });

    case (SET_SELECTED_ID):
      return ({
        ...state,
        userID: action.userID,
      });

    case (SET_TITLE_QUERY):
      return ({
        ...state,
        titleQuery: action.titleQuery,
      });

    case (SET_COMPLETED_QUERY):
      return ({
        ...state,
        completeQuery: action.completeQuery,
      });

    case (SET_IS_RANDOMIZED):
      return ({
        ...state,
        isRandomized: action.isRandomized,
      });

    case (FILTER_TODOS):
      return ({
        ...state,
        visibleTodos: state.todosFromServer.filter((todo: ToDo) => {
          const titleLower = todo.title.toLowerCase();

          switch (state.completeQuery) {
            case 'all':
              return titleLower.includes(state.titleQuery);

            case 'active':
              return titleLower.includes(state.titleQuery)
                && todo.completed === false;

            case 'completed':
              return titleLower.includes(state.titleQuery)
                && todo.completed === true;

            default:
              return todo;
          }
        }),
      });

    case (SET_LOADING_ERROR):
      return ({
        ...state,
        isLoadingError: action.isLoadingError,
      });

    case (SORT_TODOS):
      return ({
        ...state,
        visibleTodos: [...state.visibleTodos].sort((a: ToDo, b: ToDo) => {
          return a.title.localeCompare(b.title);
        }),
      });

    case (SET_IS_TODOS_SORTED):
      return ({
        ...state,
        isTodosSorted: action.isTodosSorted,
      });

    case (RANDOMIZE_TODOS):
      return ({
        ...state,
        visibleTodos: randomize(state.visibleTodos),
      });

    default:
      return state;
  }
};
