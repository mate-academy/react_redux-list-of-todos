import { Dispatch } from 'redux';
import { Todo } from '../types/Todo';
import { actions as loadingActions } from './loading';
import { getTodos } from '../api';

type SetTodosAction = {
  type: 'SET_TODOS';
  payload: Todo[];
};

type ClearFilterAction = {
  type: 'CLEAR_FILTER';
  payload: string;
};

type FilterByCompletedAction = {
  type: 'FILTER_BY_COMPLETED';
  payload: string;
};

type FilterByActiveAction = {
  type: 'FILTER_BY_ACTIVE';
  payload: string;
};

type Action = (SetTodosAction
| ClearFilterAction
| FilterByCompletedAction
| FilterByActiveAction);

export const actions = {
  setTodos: (todos: Todo[]): SetTodosAction => ({
    type: 'SET_TODOS',
    payload: todos,
  }),
  clearFilter: (query: string): ClearFilterAction => ({
    type: 'CLEAR_FILTER',
    payload: query,
  }),
  setFilterByCompleted: (query: string): FilterByCompletedAction => ({
    type: 'FILTER_BY_COMPLETED',
    payload: query,
  }),
  setFilterByActive: (query: string): FilterByActiveAction => ({
    type: 'FILTER_BY_ACTIVE',
    payload: query,
  }),
  loadTodos: (dispatch: Dispatch) => {
    dispatch(loadingActions.startLoading());
    getTodos()
      .then(todosFromServer => dispatch(actions.setTodos(todosFromServer)))
      .finally(() => dispatch(loadingActions.finishLoading()));
  },
};

type State = {
  initial: Todo[];
  filtered: Todo[];
};

const initialState: State = {
  initial: [],
  filtered: [],
};

export const todosReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_TODOS':
      return {
        initial: action.payload,
        filtered: action.payload,
      };
    case 'CLEAR_FILTER':
      return {
        ...state,
        filtered: state.initial
          .filter(todo => todo.title.includes(action.payload)),
      };
    case 'FILTER_BY_COMPLETED':
      return {
        ...state,
        filtered: state.initial?.filter(todo => todo.completed
          && todo.title.includes(action.payload)),
      };
    case 'FILTER_BY_ACTIVE':
      return {
        ...state,
        filtered: state.initial?.filter(todo => !todo.completed
          && todo.title.includes(action.payload)),
      };
    default:
      return state;
  }
};
