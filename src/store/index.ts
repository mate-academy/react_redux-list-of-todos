import { createStore } from 'redux';
import { Action, ActionType } from './actions';

export const getInitTodos = (state: RootState) => {
  const {
    initTodos,
    valueSelect,
    valueFilter,
  } = state;
  let result = initTodos;

  result = result.filter((todo) => {
    switch (valueSelect) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return todo;
    }
  });

  if (valueFilter) {
    const value = valueFilter.toLocaleLowerCase();

    result = result.filter(todo => (
      todo.title.toLowerCase().includes(value)));
  }

  return result;
};

export const getId = (state: RootState) => state.id;
export const getSelectedId = (state: RootState) => state.selectedId;
export const getValueFilter = (state: RootState) => state.valueFilter;
export const getValueSelect = (state: RootState) => state.valueSelect;
export const getUser = (state: RootState) => state.user;

const initialState: RootState = {
  initTodos: [],
  id: 0,
  selectedId: 0,
  valueFilter: '',
  valueSelect: 'all',
  randomize: false,
  user: null,
};

const rootReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_INIT_TODOS:
      return {
        ...state,
        initTodos: action.value,
      };

    case ActionType.SET_ID:
      return {
        ...state,
        initTodos: state.initTodos
          .filter(todo => todo.id !== action.value),
        id: action.value,
      };

    case ActionType.SET_SELECTED_ID:
      return {
        ...state,
        selectedId: action.value,
      };

    case ActionType.SET_VALUE_FILTER:
      return {
        ...state,
        valueFilter: action.value,
      };

    case ActionType.SET_VALUE_SELECT:
      return {
        ...state,
        initTodos: state.randomize
          ? [...state.initTodos].sort((a, b) => a.userId - b.userId)
          : state.initTodos,
        valueSelect: action.value,
        selectedId: 0,
        randomize: false,
      };

    case ActionType.SET_RANDOMIZE:
      return {
        ...state,
        initTodos: [...state.initTodos].sort(() => Math.random() - 0.5),
        randomize: true,
      };
    case ActionType.SET_USER:
      return {
        ...state,
        user: action.value,
      };

    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
);

export default store;
